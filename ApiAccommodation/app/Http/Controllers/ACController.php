<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AC;

class AAController extends Controller
{

    private $alojamento_caracteristica;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AC $alojamento_caracteristica)
    {
        $this->alojamento_caracteristica = $alojamento_caracteristica ;
    }

    public function index()
    {
        return $this->alojamento_caracteristica->paginate(10);
    }

    public function showId($id)
    {
        return AC::find($id); 
    }

    /*public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $alojamento_caracteristica = AC::create($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi criada com sucesso']]);
    }*/

    public function update($alojamento_caracteristica, Request $request)
    {
        $alojamento_caracteristica = $this->alojamento->find($alojamento_caracteristica);
        $alojamento_caracteristica->update($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi atualizada com sucesso']]);
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
        return response()->json(['data' => ['message' => 'Associação AC foi eliminada com sucesso']]);
    }
}
