<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccommodationRequirements;

class AccommodationRequirementsController extends Controller
{
    private $accommodation_requirements;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AccommodationRequirements $accommodation_requirements)
    {
        $this->accommodation_requirements = $accommodation_requirements;
    }


    public function show($id)
    {
        return AccommodationRequirements::firstOrFail()->where('accommodation_id', $id)->get();
        return response()->json(['data' => ['message' => 'Requisitos adicionados com sucesso'], 'status'=>true]);
    }

    public function store(Request $request)
    {
        $this->accommodation_requirements->create($request->all());
        return response()->json(['data' => ['message' => 'Requisitos adicionados com sucesso'], 'status'=>true]);
    }

    public function update($accommodation_requirements, Request $request)
    {
        $accommodation_requirements = $this->accommodation_requirements->find($accommodation_requirements);
        $accommodation_requirements->update($request->all());
        return response()->json(['data' => ['message' => 'Requisitos atualizados com sucesso'], 'status'=>true]);
    }

    public function destroy($accommodation_requirements)
    {
        $accommodation_requirements = $this->accommodation_requirements->find($accommodation_requirements);
        $accommodation_requirements->delete();
        return response()->json(['data' => ['message' => 'Requisitos eliminados com sucesso'], 'status'=>true]);
    }
}
