<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;


class LoginController extends Controller
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
        return view('auth.login');
    }

    public function attemptLogin(Request $request)
    {
        //dd($request->all());
        $response=Http::post(env('APIGATEWAY_URL').'login',$request->all());

        if($response->failed()){
            $resp = json_decode($response->getBody());
            //dd($resp->errors);
            //['status'=>'true' ,'response'=> $resp]
            return redirect()->route('login'); //view('login',['errors'=>]);
        }
        $resp = json_decode($response->getBody());
        $request->session()->put('token', $resp->token);
        //dd();
        //$request->session()->put('status', 'ols');
        return view('dashboard')->with('resp', $resp);
    }

    public function attemptLogout(Request $request){
        $response=Http::post(env('APIGATEWAY_URL').'login',$request->all());
        return view('/')->with('response', json_decode($response->getBody()));

    }
}
