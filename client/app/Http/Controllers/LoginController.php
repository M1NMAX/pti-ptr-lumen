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
        return view('login');
    }

    public function attemptLogin(Request $request)
    {
        // dd($request->all());
        $response=Http::post(env('APIGATEWAY_URL').'login',$request->all());

        if($response->failed()){
            dd($response->json());
            return view('login',['response'=>json_encode($response->collect())]);
        }
        $reply = json_decode($response->getBody(), true);
        return redirect('test', ['r'=>$reply]);
    }
}
