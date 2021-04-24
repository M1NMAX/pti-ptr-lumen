<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


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
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/');
        return response($response);
    }


    public function show($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id);
        return response($response);
    }

    public function showComments($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id. '/comments');
        return response($response);
    }

    public function storeComment(Request $request)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'comment/', $request->all());
        return response($response);
    }

    public function storeRentalPending(Request $request)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'rentalpending/', $request->all());
        return response($response);
    }


}
