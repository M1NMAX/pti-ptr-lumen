<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\RentalPending;

class RentalPendingController extends Controller
{

    private $rental_pending;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(RentalPending $rental_pending)
    {
        $this->rental_pending = $rental_pending ;
    }

    public function index()
    {
        return $this->rental_pending->paginate(10);
    }

    public function showId($id)
    {
        return RentalPending::find($id); 
    }

    public function landlordIdSearch($idLandlord)
    {
        return RentalPending::where('landlord_id', $idLandlord)->get(); 
    }

    public function store(Request $request)
    {
        $rental_pending = RentalPending::create($request->all());
        return response()->json(['data' => ['message' => 'Aluguer pending']]);
    }

    public function update($rental_pending, Request $request)
    {
        $rental_pending = $this->rental_pending->find($rental_pending);
        $rental_pending->update($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi atualizada com sucesso']]);
    }

    public function destroy($rental_pending)
    {
        $rental_pending = $this->rental_pending->find($rental_pending);
        $rental_pending->delete();
        return response()->json(['data' => ['message' => 'Associação AC foi eliminada com sucesso']]);
    }

    public function accept($id)
    {
        $rentalAccepted = RentalPending::find($id); 
        //Aluguer::create($aluguerAccepted);

        DB::table('rental')->insert([
            'accommodation_id' => $rentalAccepted->accommodation_id, 
            'user_id' => $rentalAccepted->user_id,
            'price' => $rentalAccepted->price,
            'beginDate' => $rentalAccepted->beginDate, 
            'endDate' => $rentalAccepted->endDate
        ]);
        $rentalAccepted->delete();

        return response()->json(['data' => ['message' => 'Aluguer foi aceite com sucesso']]);
    }


}
