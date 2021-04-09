<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;


class UsersController extends Controller
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

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'=>'required|max:30',
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' =>Hash::make($request->password),
        ]);

        $token = $user->createToken('access_token')->accessToken;
        return response(['user'=>$user, 'token'=>$token], 200);

    }

    public function login(Request $request)
    {
        $validator= Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response(['errors'=>$validator->errors()->all()], 422);
        }


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            $response = ['message' => 'Invalid Credentials'];
            return response($response, 422);
        }

        $token = $user->createToken('access_token')->accessToken;
        return response(['user'=>$user, 'token'=>$token], 200);
    }


    // public function logout(Request $request) {
    //     $token = $request->bearerToken();
    //     if ($token) {
    //         $id = (new Parser())->parse($token)->getHeader('jti');
    //         DB::table('oauth_access_tokens')->where('id', '=', $id)->update(['revoked' => 1]);
    //     }

    //     return [
    //         'status' => 'success',
    //         'message' => 'Logout successfully.'
    //     ];
  //}

}
