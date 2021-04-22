<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Accommodation;
use App\Models\Feature;
use App\Models\Rental;

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
            //----------------------------//
        }
        return $accommodations;
    }

    public function showId($id)
    {
        $acc = Accommodation::find($id);
        // $r = [];
        // array_push($r, $acc);
        // array_push($r, $acc->info);
        $response = ['accommodation'=> $acc, 'accommodationInfo'=>$acc->info];
        return response($response, 200);
    }

    public function store(Request $request)
    {
        $this->accommodation->create($request->all());
        return response()->json(['data' => ['message' => 'Alojamento foi criado com sucesso']]);
    }

    /*public function update($alojamento, Request $request)
    {
        $alojamento = $this->alojamento->find($alojamento);
        $alojamento->update($request->all());
        return response()->json(['data' => ['message' => 'Alojamento foi atualizado com sucesso']]);
    }*/





    public function update($id, Request $request)
    {
        $data = $request->all();
        $accommodation = $this->accommodation->find($id);

        // Call fill on the gift and pass in the data
        $accommodation->fill($date);
        $accommodation->touch();

        $accommodation->save();

        return response()->json(['data' => ['message' => 'Alojamento foi atualizado com sucesso']]);

    }

    public function addFeatures($id,Request $request)
    {
        $accommodation = Accommodation::find($id);
        $cIds = explode(',', $request->input("features"));
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
        return response()->json(['data' => ['message' => 'Alojamento foi eliminado com sucesso']]);
    }

    public function busyDates($id,Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        return $accommodation->rentals;

    }

    public function comments($id,Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        return $accommodation->comments;

    }

    public function localSearch($search,Request $request)
    {
        $accommodations = Accommodation::where('address', $search)
        ->orWhere('address', 'like', '%' . $search . '%')->get();
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
        $today = date('2008-04-21');
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



}
