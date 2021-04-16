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
        return $this->accommodation->take(9)->get();
    }

    public function showId($id)
    {
        return Accommodation::find($id);
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
<<<<<<< HEAD


    /*public function addFeatures($id, Request $request)
    {
        $accommodation = $this->accommodation->find($id);
        $feat = $request->input('features');
        for ($i = 0; $i < 1; $i++) {
            $feature = DB::table('feature')->find($feat);
            $accommodation->features()-attach($feature);
        }
        return response()->json(['data' => ['message' => 'Caracteristica(s) adicionada(s) com sucesso!']]);


    // return $alojamento = $this->alojamento->find($id);
    }*/


=======
    
>>>>>>> 029f3dbf74fc576365f44ae7e8c6bf3cedeee939
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
}
