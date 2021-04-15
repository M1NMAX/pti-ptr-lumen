<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AF;

class AFController extends Controller
{

    private $accommodation_feature;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AC $accommodation_feature)
    {
        $this->accommodation_feature = $accommodation_feature ;
    }

    public function index()
    {
        return $this->accommodation_feature->paginate(10);
    }

    public function showId($id)
    {
        return AF::find($id); 
    }

    /*public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $alojamento_caracteristica = AC::create($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi criada com sucesso']]);
    }*/

    public function update($accommodation_feature, Request $request)
    {
        $accommodation_feature = $this->accommodation->find($accommodation_feature);
        $accommodation_feature->update($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi atualizada com sucesso']]);
    }


    public function addCaract(Request $request)
    {
        $this->accommodation_feature->create($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica associada ao alojamento com sucesso.']]);
    }

    public function destroy($accommodation)
    {
        $accommodation = $this->accommodation->find($accommodation);
        $accommodation->delete();
        return response()->json(['data' => ['message' => 'Associação AC foi eliminada com sucesso']]);
    }
}
