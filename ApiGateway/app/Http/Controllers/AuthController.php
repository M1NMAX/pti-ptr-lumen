<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }



    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
        $validator= Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        if (! $token = Auth::attempt( $request->only(['email', 'password']))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::where('email', $request->email)->first();

        return $this->respondWithToken($user , $token);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::user(), Auth::refresh());
    }




}
