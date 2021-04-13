<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Alojamento;
use App\Models\Caracteristica;
use App\Models\Aluguer;

class AlojamentoController extends Controller
{
    private $alojamento;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Alojamento $alojamento)
    {
        $this->alojamento = $alojamento; 
    }

    public function index()
    {
        return $this->alojamento->paginate(10);
    }

    public function showId($id)
    {
        return Alojamento::find($id); 
    }

    public function store(Request $request)
    {
        $this->alojamento->create($request->all());
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
        $alojamento = $this->alojamento->find($id);

        // Call fill on the gift and pass in the data
        $alojamento->fill($data);
        $alojamento->touch();

        $alojamento->save();
                
        return response()->json(['data' => ['message' => 'Alojamento foi atualizado com sucesso']]);
    
    }
    
    
    public function addCaracteristicas($id, Request $request)
    {
        $alojamento = $this->alojamento->find($id);
        $caracts = $request->input('caracteristicas');
        //$cList.explode(",", $caracts);      
        for ($i = 0; $i < 1; $i++) {
            $caracteristica = DB::table('caracteristica')->find($caracts);
            $alojamento->caracteristicas()-attach($caracteristica);
        }
        return response()->json(['data' => ['message' => 'Caracteristica(s) adicionada(s) com sucesso!']]);
    

    // return $alojamento = $this->alojamento->find($id);
    }
    
    
    public function addCaracteristica($id,Request $request)
    {
        $alojamento = Alojamento::find($id);
        //$caracteristicas = Caracteristica::whereIn('id', $request->input("caracteristicas"))->get();
        $cIds = explode(',', $request->input("caracteristicas"));
        $alojamento->caracteristicas()->attach($cIds);

        return response()->json(['data' => ['message' => 'Sucesso']]);
    }
    

    public function showCaracteristicas($id,Request $request)
    {
        $alojamento = $this->alojamento->find($id);
        return $alojamento->caracteristicas;
    
    }
    
    public function rate($id, $value,  Request $request)
    {
        if(in_array($value, [1,2,3,4,5])){
            $alojamento = $this->alojamento->find($id);
            $rate = $alojamento->rating;
            $numRates = $alojamento->nRates;
            $finalRate = ($rate * $numRates + $value) / ($numRates +1);
            
            $alojamento->rating = $finalRate;
            $alojamento->nRates = $numRates +1;
            $alojamento->save();
            return response()->json(['data' => ['message' => 'Rating do alojamento foi atualizado com sucesso']]);
        }else{
            return response()->json(['data' => ['message' => 'Rating inválido.']]);
        }
        
    }

   

    public function addCaract(Request $request)
    {
        $this->alojamento_caracteristica->create($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica associada ao alojamento com sucesso.']]);
    }

    public function destroy($alojamento)
    {
        $alojamento = $this->alojamento->find($alojamento);
        $alojamento->delete();
        return response()->json(['data' => ['message' => 'Alojamento foi eliminado com sucesso']]);
    }

    public function busyDates($id,Request $request)
    {
        $alojamento = $this->alojamento->find($id);
        return $alojamento->alugueres;
    
    }
}
