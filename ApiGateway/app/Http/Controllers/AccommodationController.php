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
        $response = Http::get(env('API_ACCOMMODATION_URL').'accommodation/');
        return response($response);
    }


    public function show($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL').'accommodation/'.$id);
        return response($response);
    }
}
