<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;
use App\Models\Accommodation;
use App\Models\AF;
use Illuminate\Support\Facades\DB;

class FeatureController extends Controller
{
    private $feature;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Feature $feature)
    {
        $this->feature = $feature;
    }

    public function index()
    {
        return $this->feature->paginate(10);
    }

    public function show($feature)
    {
        return $this->feature->findOrFail($feature);
    }

    public function store(Request $request)
    {
        $this->feature->create($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica foi criado com sucesso']]);
    }

    public function update($feature, Request $request)
    {
        $feature = $this->feature->find($feature);
        $feature->update($request->all());
        return response()->json(['data' => ['message' => 'Caracteristica foi atualizado com sucesso']]);
    }

    public function destroy($feature)
    {
        $feature = $this->feature->find('id', $feature);
        $feature->delete();
        return response()->json(['data' => ['message' => 'Caracteristica foi eliminado com sucesso']]);
    }



    public function filter($ids, Request $request) 
    {
        $cIds = explode(',', $ids);        
        $relationships = AF::whereIn('feature_id', $cIds)->get();
        $accommodationIds = array();
        foreach($relationships as $r){
            $id = $r->accommodation_id;
            array_push($accommodationIds, $id); 
        }
        $aIdCount = array_count_values($accommodationIds);
        $res = array_keys($aIdCount,count($cIds));
        $accommodations = Accommodation::findMany($res);
        return $accommodations;
    }

}
