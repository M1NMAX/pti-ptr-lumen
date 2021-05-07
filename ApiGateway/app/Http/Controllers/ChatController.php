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

    public function messages($id,$user_id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id. '/messages' . '/' . $user_id );
        return response($response);
    }

    public function storeMessage(Request $request)
    {
        $response = Http::post(env('API_CHAT_URL') . 'message/addMessage', $request->all());
        return response($response);
    }

    public function chatExists($id1, $id2, $accommodation_id)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/' . $id1 . '/' . $id2 . '/' . $accommodation_id);
        return response($response);
    }

    public function notification($userId)
    {
        $response = Http::get(env('API_CHAT_URL') . 'chat/notifications/' .$userId);
        return response($response);
    }
}
