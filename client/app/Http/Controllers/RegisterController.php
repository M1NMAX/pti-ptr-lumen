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
            $resp = json_decode($response->getBody());
            return view('auth.register')->with('resp', $resp);
        }
        $resp = json_decode($response->getBody());
        request()->session()->put('token', $resp->token);
        return view('dashboard')->with('resp', $resp);
    }
}
