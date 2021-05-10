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
        $aboutAccommodation = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id);
        $commentsAboutAccommodation = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id . '/comments');

        $response = [
            'aboutAccommodation' => $aboutAccommodation->json(),
            'commentsAboutAccommodation' => $commentsAboutAccommodation->json(),
            'status' => true,
        ];
        return response($response);
    }

    public function store(Request $request)
    {
        $responseAccommodation = Http::post(
            env('API_ACCOMMODATION_URL') . 'accommodation/',
            $request->only('landlord_id', 'name', 'description', 'address', 'district', 'county','price', 'latitude', 'longitude')
        );

        if ($responseAccommodation->status()) {

            $accommodation_id = $responseAccommodation->collect()->get('accommodation_id');

            $responseAccommodationInfo = Http::post(env('API_ACCOMMODATION_URL') . 'accommodationInfo/', [
                'accommodation_id' => $accommodation_id,
                'accommodationType' => $request->accommodationType,
                'rooms' => $request->rooms,
                'bathRooms' => $request->bathRooms,
                'area' => $request->area,
                'solar' => $request->solar,
                'wifi' => $request->wifi,
                'clean' => $request->clean,
            ]);

            $responseAccommodationRequiriments = Http::post(env('API_ACCOMMODATION_URL') . 'accommodationRequirements/', [
                'accommodation_id' => $accommodation_id,
                'ageRangeBot' => $request->ageRangeBot,
                'ageRangeTop' => $request->ageRangeTop,
                'gender' => $request->gender,
                'smoker' => $request->smoker,
                'pets' => $request->pets,

            ]);

            $responseAccommodationAddFeatures = Http::put(env('API_ACCOMMODATION_URL') . 'accommodation/' . $accommodation_id . '/addFeatures', [
                'features' => $request->features,
            ]);
            
            if ($responseAccommodationRequiriments->json('status') && $responseAccommodationInfo->json('status')) {
                $finalResponse = ['newAccommodationId' => $accommodation_id, 'message' => 'alojamento registado com sucesso', 'status' => true];
                return response($finalResponse, 200);
            }

            return response($responseAccommodationInfo, 200);
            //return response($accommodation_id, 200);

        }

        return response($responseAccommodation, 200);
    }
    public function showDates($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id . '/busyDates');
        return response($response);
    }


    public function showFeatures($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id . '/showFeatures');
        return response($response);
    }

    public function showComments($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id . '/comments');
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
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rentalpending/' . $id);

        return response($response);
    }

    public function landlordAcceptRentalPending($id)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'rentalpending/accept/' . $id);
        return response($response);
    }

    public function landlordRejectRentalPending($id)
    {
        $response = Http::delete(env('API_ACCOMMODATION_URL') . 'rentalpending/' . $id);
        return response($response);
    }

    public function showRentGuest($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rental/rentedAccommodation/'. $id);
        return response($response);
    }

    public function showRentLandlord($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rental/rentedOwnAccommodation/'.$id);
        return response($response);
    }


    public function showFeature()
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'feature/');
        return response($response);
    }
}
