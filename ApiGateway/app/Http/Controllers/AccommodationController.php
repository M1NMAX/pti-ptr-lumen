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

    public function store(Request $request)
    {
        $responseAccommodation = Http::post(env('API_ACCOMMODATION_URL') . 'accommodation/',
        $request->only('landlord_id', 'name', 'description', 'address', 'price', 'latitude', 'longitude'));

        if($responseAccommodation->status()){

            $accommodation_id= $responseAccommodation->collect()->get('accommodation_id');

            $finalResponse =Http::post(env('API_ACCOMMODATION_URL') . 'accommodationInfo/',[
                'accommodation_id'=>$accommodation_id,
                'accommodationType'=>$request->accommodationType,
                'rooms'=>$request->rooms,
                'bathRooms'=>$request->bathRooms,
                'area'=>$request->area,
                'solar'=>$request->solar,
                'wifi'=>$request->wifi,
                'clean'=>$request->clean,
            ]);
            return response($finalResponse, 200);

        }

        return response($responseAccommodation);
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

    public function showLandlordRentalPending($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rentalpending/'.$id);


        return response($response);
    }


}
