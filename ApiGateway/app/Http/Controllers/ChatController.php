<?php

namespace App\Http\Controllers; 

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
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
        $response = Http::get(env('API_CHAT_URL') . 'chat/user/' . $id);
        return response($response);
    }

    public function showId($id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id);
        return response($response);
    }

    public function messages($id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id. '/messages');
        return response($response);
    }

    public function storeMessage(Request $request)
    {
        $response = Http::post(env('API_CHAT_URL') . 'message/addMessage', $request->all());
        return response($response);
    }

    public function chatExists($id1, $id2)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id1 . '/' . $id2);
        return response($response);
    }
}
