<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\AccommodationController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Landlord;

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

/*$router->get('/key', function () {
  return \Illuminate\Support\Str::random(32);
});*/

$router->get('/', function () {
    return "APIGATEWAY";
});


$router->group(['prefix' => 'api'], function () use ($router) {

    $router->group(['prefix' => 'favourites'], function () use ($router) {
        $router->post('/', 'FavouritesController@store');
        $router->get('/', 'FavouritesController@index');
        $router->delete('/{id}', 'FavouritesController@destroy');
    });

    // Auth and Users
    $router->get('/me', function () {return auth()->user();});
    $router->post('/login', 'UsersController@login');
    $router->get('/logout', 'UsersController@logout');
    $router->post('/register', 'UsersController@register'); //Create
    // Users
    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('/', 'UsersController@index');
        $router->get('/{id}', 'UsersController@show');
        $router->put('/{id}', 'UsersController@update');
        $router->delete('/{id}', 'UsersController@destroy');
    });

    $router->group(['prefix' => 'accommodations'], function () use ($router) {
        $router->get('/', 'AccommodationController@index');
        $router->get('/{id}', 'AccommodationController@show');
        $router->get('/{id}/comments', 'AccommodationController@comments');
    });


    $router->group(['prefix' => 'chat'], function () use ($router) {
        //$router->get('/', 'AccommodationController@index');
        $router->get('/{id}', 'AccommodationController@show');
        //$router->get('/{id}/comments', 'AccommodationController@comments');
    });

});
