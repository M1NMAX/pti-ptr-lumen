<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use App\Models\Landlord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    public function store(Request $request)
    {
        //VALIDATE THE USER TYPE
        //VALIDATE THE USER DATA
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



    public function profile(){
        return response(Auth::user(), 200);
    }

    public function index(){
        $users = User::get();
        return response($users, 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        $response = ['user'=>$user, 'extra'=>$user->userable()->first(), 'status'=>true];
        return response($response, 200);
    }

    public function update($id, Request $request)
    {
        $user = User::find($id);
        $user->update($request->only('username', 'email', 'name', 'birthdate'));
        if($request->type === 'guest')
        {
            $user->userable()->update($request->only('college', 'gender', 'age', 'pets', 'smoker'));
        }
        $response = ['message' => 'data have been updated successfuly', 'status'=> true];
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
