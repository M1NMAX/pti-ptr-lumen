<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\Accommodation;

class RentalController extends Controller
{

    private $rental;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Rental $rental)
    {
        $this->rental = $rental ;
    }

    public function index()
    {
        return $this->rental->paginate(10);
    }

    public function showId($id)
    {
        return Rental::findOrFail($id); 
    }

    public function store(Request $request)
    {
        //$this->alojamento_caracteristica->AC::create($request->all());
        $rental = Rental::create($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi criado com sucesso']]);
    }

    public function update($rental, Request $request)
    {
        $rental = $this->rental->find($rental);
        $rental->update($request->all());
        return response()->json(['data' => ['message' => 'Aluguer foi atualizado com sucesso']]);
    }

    public function destroy($rental)
    {
        $rental = $this->rental->find($rental);
        $rental->delete();
        return response()->json(['data' => ['message' => 'Aluguer foi eliminado com sucesso']]);
    }


    public function accommodationRented($user_id)
    {
        $accommodationIds = [];
        $rentals = Rental::where('user_id', $user_id)
        ->get();
        foreach($rentals as $rental){
            array_push($accommodationIds, $rental->accommodation_id);
        }
        //RETURNS IDS
        return $accommodationIds;
    }


    public function ownAccommodationRented($user_id)
    {
        $accommodations = Accommodation::where('landlord_id', $user_id)->get();
        $rentedAccommodations = [];
        $ownAccommodations = [];

        $rentals = Rental::get();
        foreach($rentals as $rental){
            array_push($rentedAccommodations, $rental->accommodation_id);
        }

        foreach($accommodations as $accommodation){
            if(in_array($accommodation->id, $rentedAccommodations))
                array_push($ownAccommodations, $accommodation->id);
        }

        
        //RETURNS IDS
        return $ownAccommodations;
    }
}
