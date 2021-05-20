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
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation');
        return response($response);
    }

    public function indexBestOnes()
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/bestOnes');
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
            $request->only('landlord_id', 'name', 'description', 'address', 'location','price', 'latitude', 'longitude')
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

    public function destroy($id)
    {
        $response = Http::delete(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id );
        return response($response);
    }

    public function update($id, Request $request)
    {
        //Miss location
        $responseBasic = Http::put(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id,
        $request->only('name', 'address', 'description', 'price', 'latitude', 'longitude'));

        $responseAccommodationInfo = Http::put(env('API_ACCOMMODATION_URL') . 'accommodationInfo/' . $id,
            $request->only('accommodationType', 'rooms', 'bathRooms', 'area', 'solar', 'clean', 'wifi'));

        $responseAccommodationRequiriments = Http::put(env('API_ACCOMMODATION_URL') . 'accommodationRequirements/' . $id,
        $request->only('ageRangeBot', 'ageRangeTop', 'gender', 'smoker', 'pets'));


        $responseAccommodationUpdateFeatures = Http::put(env('API_ACCOMMODATION_URL') . 'accommodation/' . $id . '/updateFeatures', [
            'features' => $request->features,
        ]);


        if ($responseBasic->json('status') && $responseAccommodationRequiriments->json('status') && $responseAccommodationInfo->json('status')) {
            $finalResponse = ['message' => 'alojamento atualizado com sucesso', 'status' => true];
            return response($finalResponse, 200);
        }

    }

    public function makePayment($id)
    {
        $response = Http::put(env('API_ACCOMMODATION_URL') . 'rental/payRent/' . $id );
        return response($response);
    }

    public function landlordAccommodation($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/landlord/' . $id );
        return response($response);
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

    public function addFeature(Request $request)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'feature/', $request->all());
        return response($response);
    }

    public function removeFeature($id)
    {
        $response = Http::delete(env('API_ACCOMMODATION_URL') . 'feature/'. $id);
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

    public function showGuestRentalPending($id)
    {
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rentalpending/guest/' . $id);

        return response($response);
    }

    public function landlordAcceptRentalPending($id)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'rentalpending/landlordAccept/' . $id);
        return response($response);
    }

    public function guestAcceptRentalPending($id)
    {
        $response = Http::post(env('API_ACCOMMODATION_URL') . 'rentalpending/guestAccept/' . $id);
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

    public function filter($filters){
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/filter/'.$filters);
        return response($response);
    }

    public function localSearch($location){
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'accommodation/localSearch/'.$location);
        return response($response);
    }

    public function rentalPendingNotification($id){
        $response = Http::get(env('API_ACCOMMODATION_URL') . 'rentalpending/rentalNotification/'.$id);
        return response($response);
    }
}
