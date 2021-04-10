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

$router->get('/profileAlojamento', function () {
    return view('profileAlojamento');
});

$router->get('/register', function () {
    return view('auth.register');
});

$router->get('login', ['as' => 'login', 'uses' => 'LoginController@showPage']);
$router->post('login', ['as' => 'login', 'uses' => 'LoginController@attemptLogin']);


$router->get('/actions/newImage', function () {
    return view('actions/newImage');
});

$router->get('/inc/navbar', function () {
    return view('/inc/navbar');
});

$router->get('/reg', function () {
    return view('reg');
});
//$router->get('/actions/profileUser', 'newImage@add'); Carol
//$router->post('/actions/newImage', 'newImage@add');


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



