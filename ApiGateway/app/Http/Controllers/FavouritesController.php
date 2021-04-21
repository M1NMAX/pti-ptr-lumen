<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favourites;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class FavouritesController extends Controller
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

    public function store (Request $request){
        $validator = Validator::make($request->all(),[
            'accommodation_id' =>'required|integer',
            ]
        );
        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        $request->user()->favourites()->create(['accommodation_id'=> $request->id]);

    }

    public function index()
    {
        $favourites = Favourites::get();
        return response($favourites, 200);
    }

    public function destroy($id)
    {
        $favourite = Favourites::find($id);
        $favourite->delete();
        $response = ['message' => 'accommodation with id='.$id.' have been successfully deleted'];
        return response($response, 200);
    }


}
