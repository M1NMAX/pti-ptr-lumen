<?php

namespace App\Http\Controllers; 

use Illuminate\Support\Facades\Http;

class ChatController extends Controller
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

    //
    public function index()
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/');
        return response($response);
    }


    public function show($id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/user' . $id);
        return response($response);
    }

    /*public function comments($id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id. '/comments');
        return response($response);
    }*/


}
