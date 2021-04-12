<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Caracteristica;
use App\Models\Alojamento;
use App\Models\AC;
use Illuminate\Support\Facades\DB;

class CaracteristicaController extends Controller
{
    private $caracteristica;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Caracteristica $caracteristica)
    {
        $this->caracteristica = $caracteristica;
    }

    public function index()
    {
        return $this->caracteristica->paginate(10);
    }

    public function show($caracteristica)
    {
        return $this->caracteristica->findOrFail($caracteristica);
    }

    public function store(Request $request)
    {
        $this->caracteristica->create($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica foi criado com sucesso']]);
    }

    public function update($caracteristica, Request $request)
    {
        $caracteristica = $this->caracteristica->find($caracteristica);
        $caracteristica->update($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica foi atualizado com sucesso']]);
    }

    public function destroy($caracteristica)
    {
        $caracteristica = $this->caracteristica->find('id', $caracteristica);
        $caracteristica->delete();
        return response()->json(['data' => ['message' => 'Caracteristica foi eliminado com sucesso']]);
    }



    public function filter($ids, Request $request) 
    {
        $cIds = explode(',', $ids);        
        $relationships = AC::whereIn('caracteristica_id', $cIds)->get();
        $alojamentoIds = array();
        foreach($relationships as $r){
            $id = $r->alojamento_id;
            array_push($alojamentoIds, $id); 
        }
        $aIdCount = array_count_values($alojamentoIds);
        $res = array_keys($aIdCount,count($cIds));
        $alojamentos = Alojamento::findMany($res);
        return $alojamentos;
    }

}
