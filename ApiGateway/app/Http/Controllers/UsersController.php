<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\Landlord;
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
        //VALIDATE THE USER TYPE
        $validatorType = Validator::make($request->only('type'), [
            'type' => 'required'
        ]);

        if($validatorType->fails()){
            return response(['errors' =>  $validatorType->errors()->all()], 422);
        }

        //LANDLORD SECTION
        if($request->type == 'landlord'){
            //VALIDATE THE USER DATA
            $validator = Validator::make($request->all(), [
                'username'=>'required|max:30',
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required|confirmed|min:6',
                'birthdate' => 'required'
            ]);

            if($validator->fails()){
                return response(['errors' =>  $validator->errors()->all()], 422);
            }

            $landLord = Landlord::create();
            $landLord->user()->create([
                'username' => $request->username,
                'name' => $request->name,
                'email' => $request->email,
                'password' =>Hash::make($request->password),
                'birthdate'=>$request->birthdate,
            ]);

        //GUEST SECTION
        }elseif($request->type =='guest'){
            $validatorCollege = Validator::make($request->only('college'), [
                'college' => 'required'
            ]);

            if($validatorCollege->fails()){
                return response(['errors' =>  $validatorCollege->errors()->all()], 422);
            }

            $guest = Guest::create(['college'=> $request->college]);
            $guest->user()->create([
                'username' => $request->username,
                'name' => $request->name,
                'email' => $request->email,
                'password' =>Hash::make($request->password),
                'birthdate'=>$request->birthdate,
            ]);

        }

        return response(['message' => 'New user has been created successfuly', 'status' =>true],200);

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


    public function logout (Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        return response( ['message' => 'You have been successfully logged out!', 'status'=>true], 200);
    }

    public function index(){
        $users = User::get();
        return response($users, 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response($user, 200);
    }
    public function update($id, Request $request)
    {
        $user = User::find($id);
        $user->update($request->all());
        $response = ['message' => 'your data have been successfully updated'];
        return response($response, 200);
    }
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        $response = ['message' => 'your data have been successfully deleted'];
        return response($response, 200);
    }
}
