<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccommodationInfo;
use Illuminate\Support\Facades\DB;

class AccommodationInfoController extends Controller
{
    private $accommodation_info;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(AccommodationInfo $accommodation_info)
    {
        $this->accommodation_info = $accommodation_info;
    }


    public function show($id)
    {
        return AccommodationInfo::firstOrFail()->where('accommodation_id', $id)->get();
    }

    public function store(Request $request)
    {
        $this->accommodation_info->create($request->all());
        return response()->json(['data' => ['message' => 'User foi criado com sucesso'], 'status'=>true]);
    }

    public function update($accommodation_info, Request $request)
    {

    $accommodation_info = DB::table('accommodation_info')->where('accommodation_id', $accommodation_info);
    $accommodation_info->update($request->all());

    return response()->json(
        ['data' => ['message' => 'Informações do alojamento foram atualizadas com sucesso'],
        'status'=>true]);
    }

    public function destroy($accommodation_info)
    {
        $accommodation_info = $this->accommodation_info->find($accommodation_info);
        $accommodation_info->delete();
        return response()->json(['data' => ['message' => 'User foi eliminado com sucesso']]);
    }




}
