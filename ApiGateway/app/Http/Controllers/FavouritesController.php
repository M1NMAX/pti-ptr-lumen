<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favourites;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;


class FavouritesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store (Request $request){

        $validator = Validator::make($request->only('accommodation_id'),[
            'accommodation_id' =>'required|integer',
            ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        //Only a Guest can have favourites
        if (!Gate::authorize('add-favourite')) {
            abort(403);
        }

        //Only add if does not exist in your list
        if (DB::table('favourites')->where('user_id', auth()->user()->id)
            ->where('accommodation_id', $request->accommodation_id)->doesntExist())
        {
            $user = User::where('email', auth()->user()->email)->first();
            $user->favourites()->create(['accommodation_id'=> $request->accommodation_id]);
            $response = ['message' => 'accommodation with id '.$request->accommodation_id.' have been successfully added in your favourites', 'status'=>true];
            return response($response, 200);
        }

        $alternativeResponse = ['message' => 'accommodation with id '.$request->accommodation_id.' already is in your favourites', 'status'=>true];
        return response($alternativeResponse, 200);



    }

    public function index()
    {
        $user = User::where('email', auth()->user()->email)->first();
        $response = ['favourites'=>$user->favourites()->get(), 'status'=>true];
        return response($response, 200);
    }

    public function destroy($id)
    {
        if (!Gate::authorize('remove-favourite', auth()->user())) {
            abort(403);
        }
        if (DB::table('favourites')->where('user_id', auth()->user()->id)
            ->where('accommodation_id', $id)->doesntExist())
        {
            $response = ['message' => 'accommodation with id '.$id.' is not in your favourites', 'status' => true];
            return response($response, 200);
        }
        $user = User::where('email', auth()->user()->email)->first();
        $user->favourites()->where('accommodation_id', $id)->delete();
        $response = ['message' => 'accommodation with id '.$id.' have been successfully removed from your favourites', 'status' => true];
        return response($response, 200);
    }


}
