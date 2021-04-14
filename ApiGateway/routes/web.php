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

//$router->get('/key', function () {
//  return \Illuminate\Support\Str::random(32);
//});

$router->get('/', function () {
    return "APIGATEWAY";
});


$router->group(['prefix' => 'api'], function () use ($router) {

    $router->get('/me', function () {
        return auth()->user();
    });


    $router->post('/login', 'UsersController@login');
    $router->get('/logout', 'UsersController@logout');
    $router->post('/register', 'UsersController@register'); //Create

    $router->group(['prefix' => 'users'], function () use ($router) {

        $router->get('/', 'UsersController@index');
        $router->get('/{id}', 'UsersController@show');
        $router->put('/{id}', 'UsersController@update');
        $router->delete('/{id}', 'UsersController@destroy');
    });
});
