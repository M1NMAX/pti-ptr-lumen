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
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;




class UsersController extends Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => [
            'register',
            'login',
            'show'
        ]]);
    }

    public function register(Request $request)
    {
        //VALIDATE THE USER TYPE AND DATA
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'username'=>'required|max:30',
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
            'birthdate' => 'required'
        ]);

        if($validator->fails()){
            return response(['errors' =>  $validator->errors()->all()], 422);
        }

        //LANDLORD SECTION
        if($request->type == 'landlord'){

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
            $validatorCollege = Validator::make($request->only('college', 'gender', 'pets', 'smoker'), [
                'college' => 'required',
                'gender' => 'required|alpha',
                'pets' => 'required|boolean',
                'smoker'=> 'required|boolean'
            ]);

            if($validatorCollege->fails()){
                return response(['errors' =>  $validatorCollege->errors()->all()], 422);
            }

            $guest = Guest::create([
                'college' => $request->college,
                'gender' => $request->gender,
                'pets' => $request->pets,
                'smoker' => $request->smoker,
                ]);

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
        //Only admin can see all users
        if (!Gate::authorize('view-users', auth()->user())) {
            abort(403);
        }
        $users = User::get();
        return response($users, 200);
    }

    public function show($id)
    {
        //Only landlord and admin can see an expecific user data
        // if (!Gate::authorize('show-user', auth()->user())) {
        //     abort(403);
        // }
        $user = User::findOrFail($id);
        $response = ['user'=>$user, 'extra'=>$user->userable()->first(), 'status'=>true];
        return response($response, 200);
    }

    public function update($id, Request $request)
    {
        $user = User::find($id);
        if (!Gate::authorize('update-user', $user)) {
            abort(403);
        }

        $user->update($request->only('username', 'email', 'name', 'birthdate'));
        if($request->type === 'guest'){
            $user->userable()->update($request->only('college', 'gender', 'age', 'pets', 'smoker'));
        }
        $response = ['message' => 'data have been updated successfuly', 'status'=> true];
        return response($response, 200);
    }

    public function destroy($id)
    {
        if (!Gate::authorize('destroy-user', auth()->user())) {
            abort(403);
        }
        $user = User::find($id);
        $user->delete();
        $response = ['message' => 'your data have been successfully deleted'];
        return response($response, 200);
    }


}
