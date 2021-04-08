<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use App\Http\Controllers\LoginController;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () {
    return view('home');
});

$router->get('/register', function () {
    return view('register');
});

$router->get('/login', function () {
    return view('login');
});

$router->get('/actions/newImage', function () {
    return view('actions/newImage');
});

$router->get('/inc/navbar', function () {
    return view('/inc/navbar');
});
//$router->get('/actions/profileUser', 'newImage@add'); Carol
//$router->post('/actions/newImage', 'newImage@add');

$router->post('/attemptLogin', function(Request $request){
    $response=Http::post(env('APIGATEWAY_URL').'login',$request->all());

        if($response->failed()){
            dd($response->json());
            return view('login',['response'=>json_encode($response->collect())]);
        }
        $resp = json_decode($response->getBody(), true);
        return view('dashboard')->with('resp', $resp) ;
});

$router->get('/dashboard', function () {
    return view('dashboard');
});

$router->get('/fakeLogin', function(){
    $response=Http::post(env('APIGATEWAY_URL').'login',[
        'email'=> 'max@test',
        'password'=>'password'
    ] );
    $resp = json_decode($response->getBody());
    // $resp = json_decode($response->getBody(), true);
    return view('dashboard')->with('resp', $resp);
});


$router->get('/profileUser', function () {
    return view('profileUser');
});

$router->get('/registerAlojamento', function () {
    return view('registerAlojamento');
});


$router->get('email', function(){
    $response = Http::withToken(env('ACCESS_TOKEN'))->get(env('APIGATEWAY_URL').'email');

    dd($response->json());
    // return view('test', ['response'=> $response,]);
});

$router->get('fake', function(){
        $response=Http::post(env('APIGATEWAY_URL').'register',[
            'name'=> 'max',
            'email'=>'max@gmail.com',

        ] );

        $response = json_decode($response->getBody(), true);
        return redirect('test', ['response'=>$response]);

});
