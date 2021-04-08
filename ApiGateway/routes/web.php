<?php
use App\Http\Controllers\UsersController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    return "APIGATEWAY";
});

// $router->get('/key', function() {
//     return \Illuminate\Support\Str::random(32);
// });


$router->post('/register', 'UsersController@register');
$router->post('/login', 'UsersController@login');
$router->post('/logout', 'UsersController@logout');

$router->get('/email', function() {
    return "hollo";
});
// $router->group(['middleware' => 'clients'], function () use ($router) {

// });


// $router->post('/fake', function (Request $request) {
//     dd($request['name']);
// });
