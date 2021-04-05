<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


class RegisterController extends Controller
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

    public function showPage()
    {
        return view('auth.register');
    }

    public function registeUser(Request $request)
    {
        $response=Http::post(env('APIGATEWAY_URL').'register',[
            'name'=> 'max',

        ] );

        if($response->failed()){

            return view('auth.register',['response'=>json_encode($response->collect())]);
        }

        // dd($request->flexRadio);
    }
}
