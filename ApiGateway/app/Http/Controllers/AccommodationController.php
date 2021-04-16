<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class AccommodationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //
    public function index()
    {
        $response = Http::get(env('API_ACCOMMODATION_URL').'alojamento/');
        return response($response);
    }


    public function show($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL').'alojamento/'.$id);
        return response($response);
    }
}
