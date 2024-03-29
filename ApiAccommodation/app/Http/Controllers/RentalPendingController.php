<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\RentalPending;
use Illuminate\Support\Facades\Validator;

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

    public function landlordIdSearch($landlord_id)
    {
        $landLordPending = DB::table('rental_pending')
                    ->where('landlord_id', $landlord_id)
                    ->where('landlordAccepted','=', 0)
                    ->get();


        $response =['pending'=>$landLordPending, 'status'=>true];

        $query = DB::table('rental_notification')
                    ->where('user_id', $landlord_id)
                    ->delete();


        return response($response, 200);
    }


    public function guestIdSearch($guest_id)
    {

        $guestPending = DB::table('rental_pending')
                    ->where('user_id', $guest_id)
                    ->where('landlordAccepted','=', 1)
                    ->get();

        $response =['pending'=>$guestPending, 'status'=>true];

        $query = DB::table('rental_notification')
                    ->where('user_id', $guest_id)
                    ->delete();

        return response($response, 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'landlord_id' => 'required',
            'accommodation_id'=>'required|max:30',
            'user_id' => 'required',
            'price' => 'required',
            'beginDate' => 'required',
            'endDate' => 'required',
        ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        $rental_pending = RentalPending::create($request->all());
        $query = DB::table('rental_notification')
                    ->where('user_id', $request->landlord_id)
                    ->get();
        
        if(count($query) == 0){
            DB::table('rental_notification')
            ->insert(['user_id' => $request->landlord_id]);
        }
        return response()->json(['data' => ['message' => 'Aluguer pending'], 'status'=>true]);


    }

    public function update($rental_pending, Request $request)
    {
        $rental_pending = $this->rental_pending->find($rental_pending);
        $rental_pending->update($request->all());
        return response()->json(['data' => ['message' => 'Associação AC foi atualizada com sucesso']]);
    }

    public function destroy($id)
    {
        $rental_pending = $this->rental_pending->find($id);
        $rental_pending->delete();
        return response()->json(['data' => ['message' => 'Associação AC foi eliminada com sucesso'], 'status'=>true]);
    }

    public function accept($id)
    {
        $rentalAccepted = RentalPending::find($id);
        //Aluguer::create($aluguerAccepted);

        DB::table('rental')->insert([
            'accommodation_id' => $rentalAccepted->accommodation_id,
            'guest_id' => $rentalAccepted->user_id,
            'landlord_id' => $rentalAccepted->landlord_id,
            'price' => $rentalAccepted->price,
            'beginDate' => $rentalAccepted->beginDate,
            'endDate' => $rentalAccepted->endDate,
            'paymentState' => false
        ]);
        $rentalAccepted->delete();

        return response()->json(['data' => ['message' => 'Aluguer foi aceite com sucesso'], 'status'=>true]);
    }

///////////////////////////////////////////////////////////////////////
    public function landlordAccept($id)
    {
        $rentalAccepted = RentalPending::find($id);
        $rentalAccepted->landlordAccepted = true;
        $rentalAccepted->touch();
        $rentalAccepted->save();
        
        $query = DB::table('rental_notification')
                    ->where('user_id', $rentalAccepted->user_id)
                    ->get();

        if(count($query) == 0){
            DB::table('rental_notification')
            ->insert(['user_id' => $rentalAccepted->user_id]);
        }

        return response()->json(['data' => ['message' => 'Aluguer foi aceite pelo senhorio'], 'status'=>true]);
    }


    public function guestAccept($id)
    {
        $rentalAccepted = RentalPending::find($id);
        DB::table('rental')->insert([
            'accommodation_id' => $rentalAccepted->accommodation_id,
            'guest_id' => $rentalAccepted->user_id,
            'landlord_id' => $rentalAccepted->landlord_id,
            'price' => $rentalAccepted->price,
            'beginDate' => $rentalAccepted->beginDate,
            'endDate' => $rentalAccepted->endDate,
            'paymentState' => 0,
        ]);
        $rentalAccepted->delete();
        return response()->json(['data' => ['message' => 'Aluguer foi aceite com sucesso'], 'status'=>true]);
    }



///////////////////////////////////////////////////////////////////////

    public function checkNotification($landlord_id)
    {
        //POR FAZER
        $query = DB::table('rental_notification')
        ->where('user_id', $landlord_id)
        ->get();
        $boolean = true;
        if(count($query) == 0){
            $boolean = false;
        }
        return response()->json(['data' => ['notification' => $boolean], 'status'=>true]);
    }


}
