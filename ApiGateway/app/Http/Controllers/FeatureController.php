<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;


class FeaturesController extends Controller
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
            'id' =>'required|integer',
            ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        $user->features()->create(['id'=> $request->id]);
        $response = ['message' => 'feature with id '.$request->id.' have been successfully added', 'status'=>true];
        return response($response, 200);

    }

    public function index()
    {
        $user = User::where('email', auth()->user()->email)->first();
        $response = ['favourites'=>$user->favourites()->get(), 'status'=>true];
        return response($response, 200);
    }

    public function destroy($id)
    {
        $user = User::where('email', auth()->user()->email)->first();
        $user->favourites()->where('accommodation_id', $id)->delete();
        $response = ['message' => 'accommodation with id '.$id.' have been successfully deleted', 'status' => true];
        return response($response, 200);
    }


}
