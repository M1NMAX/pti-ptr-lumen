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
        // dd($request->all());
        $response=Http::post(env('APIGATEWAY_URL').'register',$request->all());

        if($response->failed()){
            dd($response->json());
            return view('auth.register',['response'=>json_encode($response->collect())]);
        }
        $reply = json_decode($response->getBody(), true);
        return redirect('/');
    }
}
