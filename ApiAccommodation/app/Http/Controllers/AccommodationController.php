<?php

namespace App\Http\Controllers;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Accommodation;
use App\Models\AccommodationInfo;
use App\Models\AccommodationRequirements;
use App\Models\Feature;
use App\Models\Rental;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;
use App\Models\AF;



class AccommodationController extends Controller
{
    private $accommodation;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Accommodation $accommodation)
    {
        $this->accommodation = $accommodation;
    }

    public function index()
    {
        // return $this->accommodation->paginate(10);

        $accommodations = $this->accommodation->take(9)->get();
        //$accommodations = $this->accommodation->get();
        //--------updateRating--------//
        //(O rate dos comentários quando se faz seed, n afeta o rate do alojamento)
        foreach ($accommodations as $acc) {
            $comments = $acc->comments;
            $sum = 0;
            $sumN = 0;
            foreach ($comments as $comment) {
                $sum += $comment->rate;
                $sumN += 1;
            }
            if(!($sumN == 0)){
                $acc->rating = $sum/$sumN;
                $acc->nRates = $sumN;
                $acc->save();
            }

        }
        return $accommodations;
    }

    public function showId($id)
    {

        $r = [];
        $acc = Accommodation::find($id);
        array_push($r, $acc);
        array_push($r, $acc->info);
        array_push($r, $acc->requirements);
        return $r[0];
    }


    public function showIds($ids)
    {

        $cIds = explode(',', $ids);
        $r = [];
        $res =[];

        for($i = 0; $i< count($cIds); $i++){
            $acc = Accommodation::find($cIds[$i]);
            array_push($r, $acc);
            array_push($r, $acc->info);
            array_push($res,$r[0]);
            $r = [];
        }
        return $res;
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'landlord_id' => 'required',
            'name'=>'required|max:30',
            'description' => 'required',
            'price' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required'
        ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }


        $accommodationMake = $this->accommodation->create($request->all());

        $response =['accommodation_id'=>$accommodationMake->id, 'status'=>true] ;
        return response($response, 200);
    }


    public function update($id, Request $request)
    {
        $data = $request->all();
        $accommodation = $this->accommodation->find($id);

        $accommodation->fill($data);
        $accommodation->touch();

        $accommodation->save();

        return response()->json(['data' => ['message' => 'Alojamento foi atualizado com sucesso']]);

    }

    public function addFeatures($id,Request $request)
    {
        $accommodation = Accommodation::find($id);
        $cIds = explode(',', $request->input("features"));
        array_pop($cIds);
        $accommodation->features()->attach($cIds);
        return response()->json(['data' => ['message' => 'Sucesso']]);
    }


    public function showFeatures($id,Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        return $accommodation->features;

    }

    public function rate($id, $value,  Request $request)
    {
        if(in_array($value, [1,2,3,4,5])){
            $accommodation = $this->accommodation->find($id);
            $rate = $accommodation->rating;
            $numRates = $accommodation->nRates;
            $finalRate = ($rate * $numRates + $value) / ($numRates +1);

            $accommodation->rating = $finalRate;
            $accommodation->nRates = $numRates +1;
            $accommodation->save();
            return response()->json(['data' => ['message' => 'Rating do alojamento foi atualizado com sucesso']]);
        }else{
            return response()->json(['data' => ['message' => 'Rating inválido.']]);
        }

    }



    public function addFeat(Request $request)
    {
        $this->accommodation_feature->create($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica associada ao alojamento com sucesso.']]);
    }

    public function destroy($accommodation)
    {
        $accommodation = $this->accommodation->find($accommodation);
        $accommodation->delete();
        $aComments = $accommodation->comments;
        if(!($aComments == null)){
            foreach($aComments as $comment){
                $c = Comment::find($comment->id);
                $c->delete();
            }
        }
        return response()->json(['data' => ['message' => 'Alojamento foi eliminado com sucesso'], 'status'=>true]);
    }

    public function busyDates($id,Request $request)
    {
        $busyDates = [];
        //array_push($busyDates, $date);
        $accommodation = $this->accommodation->find($id);
        $rentals = $accommodation->rentals;
        foreach ($rentals as $rental) {
            $period = CarbonPeriod::create($rental->beginDate, $rental->endDate);
            $rental_dates = [];
            // Iterate over the period
            foreach ($period as $date) {
                if(!(in_array($date->format('Y-m'), $rental_dates))){
                    array_push($rental_dates,$date->format('Y-m'));
                }
            }
            foreach ($rental_dates as $date) {
                array_push($busyDates,$date);
            }
        }
        return $busyDates;

    }

    public function comments($id,Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        return $accommodation->comments;

    }

    public function localSearch($search,Request $request)
    {
        $accommodations = Accommodation::where('county', $search)
        ->orWhere('county', 'like', '%' . $search . '%')->get();
        return $accommodations;

    }

    public function landlordSearch($id,Request $request)
    {
        $accommodations = Accommodation::where('landlord_id', $id)->get();
        return $accommodations;

    }

    public function status($id,Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        //$today = date("Y/m/d");
        $today = date('2021-12-01');
        $rentals = $accommodation->rentals;
        foreach($rentals AS $rental){
            $begin = $rental->beginDate;
            $end = $rental->endDate;
            if(($today >= $begin) && ($today <= $end)){
                $accommodation->available = 0;
                $accommodation->save();
                return 0;
            }
        }
        $accommodation->available = 1;
        $accommodation->save();
        return 1;
    }


    public function typeSearch($accommodationType, Request $request)
    {
        $accommodations = Accommodation::where('address', $search)
        ->orWhere('address', 'like', '%' . $search . '%')->get();
        return $accommodations;

    }

    public function filter($filters, Request $request) 
    {
        $filters = str_replace("%20"," ",$filters);
        $filters = explode(';', $filters); 
        
        $cIds = explode(',', $filters[0]); 
        return $cIds;   
        $infos = explode(',', $filters[1]); 
        
        
        $infoFilter = [];
        $requirementFilter = [];
        $basicFilter = [];
        if(in_array('location', $infos)){
            $index = array_search('location',$infos);
            array_push($basicFilter,['county', 'like', '%' . $infos[$index+1] . '%']);
        }
        //return $infoFilter;
        if(in_array('priceMax', $infos)){
            $index = array_search('priceMax',$infos);
            array_push($basicFilter,['price', '<', $infos[$index+1]]);
        }
        if(in_array('priceMin', $infos)){
            $index = array_search('priceMin',$infos);
            array_push($basicFilter,['price', '>', $infos[$index+1]]);
        }


        if(in_array('accommodationType', $infos)){
            $index = array_search('accommodationType',$infos);
            array_push($infoFilter,['accommodationType', '=', $infos[$index+1]]);
        }
        if(in_array('wifi', $infos)){
            $index = array_search('wifi',$infos);
            array_push($infoFilter,['wifi', '=', 1]);
        }
        if(in_array('clean', $infos)){
            $index = array_search('clean',$infos);
            array_push($infoFilter,['clean', '=', 1]);
        }

 

        if (($key = array_search('', $cIds)) !== false) {
            unset($cIds[$key]);
        }

        /////FEATURES///FILTER///IDS/////
        $relationships = AF::whereIn('feature_id', $cIds)->get();
        
        
        $accommodationFeatureIds = [];
        foreach($relationships as $r){
            $id = $r->accommodation_id;
            array_push($accommodationFeatureIds, $id); 
        }


        /////INFOS///FILTER///IDS/////
        $accommodationIdsInfoFilter = DB::table('accommodation_info')
                ->select('accommodation_id')
                ->where($infoFilter)
                ->get();

        
        
        $accommodationInfoIds = [];
        foreach($accommodationIdsInfoFilter as $accommodation){
            $id = $accommodation->accommodation_id;
            array_push($accommodationInfoIds, $id); 
        }
        
        //return $infoFilter;
        $accommodationIdsRequirementsFilter = DB::table('accommodation_requirements')
        ->select('accommodation_id')
        ->where($requirementFilter)
        ->get();

        $accommodationRequirementsIds = [];
        foreach($accommodationIdsRequirementsFilter as $accommodation){
            $id = $accommodation->accommodation_id;
            array_push($accommodationRequirementsIds, $id); 
        }
        ///////////////////////////////////////////////////////////////
        $aIdCount = array_count_values($accommodationFeatureIds);
        $res = array_keys($aIdCount,count($cIds));
        $accommodations = Accommodation::findMany($res);
        return $accommodationRequirementsIds;
    }


}
