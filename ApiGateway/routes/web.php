<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\FeatureController;
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

$router->get('/key', function () {
    return \Illuminate\Support\Str::random(32);
});

$router->get('/', function () {
    return "APIGATEWAY";
});


$router->group(['prefix' => 'api'], function () use ($router) {

    $router->group(['prefix' => 'favourites'], function () use ($router) {
        $router->post('/', 'FavouritesController@store');
        $router->get('/', 'FavouritesController@index');
        $router->delete('/{id}', 'FavouritesController@destroy');
    });

    // Return the current authenticate user
    $router->get('/me',['middleware' => 'auth', function () {
        return auth()->user();
    }]);

    //Auth
    $router->post('/login', 'UsersController@login');
    $router->get('/logout', 'UsersController@logout');
    //Create
    $router->post('/register', 'UsersController@register');
    // Users
    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('/', 'UsersController@index');
        $router->get('/{id}', 'UsersController@show');
        $router->put('/{id}', 'UsersController@update');
        $router->delete('/{id}', 'UsersController@destroy');
    });

    $router->group(['prefix' => 'accommodations'], function () use ($router) {
        $router->get('/feature', 'AccommodationController@showFeature');

        $router->get('/landlord/{id}', 'AccommodationController@landlordAccommodation');

        $router->get('/', 'AccommodationController@index');
        $router->get('/{id}', 'AccommodationController@show');
        $router->post('/', 'AccommodationController@store');
        $router->put('/{id}', 'AccommodationController@update');
        $router->delete('/{id}', 'AccommodationController@destroy');



        $router->get('/{id}/dates', 'AccommodationController@showDates');
        $router->get('/{id}/showFeatures', 'AccommodationController@showFeatures');
        $router->get('/{id}/comments', 'AccommodationController@showComments');
        $router->post('/comment', 'AccommodationController@storeComment');

        $router->post('/rentalpending', 'AccommodationController@storeRentalPending');
        $router->post('/rentalpending/acceptLandlord/{id}', 'AccommodationController@landlordAcceptRentalPending');
        $router->post('/rentalpending/acceptGuest/{id}', 'AccommodationController@guestAcceptRentalPending');
        $router->get('/rentalpending/{id}', 'AccommodationController@showLandlordRentalPending');
        $router->get('/rentalpendingGuest/{id}', 'AccommodationController@showGuestRentalPending');
        $router->get('/rentalNotification/{id}', 'AccommodationController@rentalPendingNotification');
        $router->delete('/rentalpending/{id}', 'AccommodationController@landlordRejectRentalPending');

        $router->get('/rentedAccommodation/{id}', 'AccommodationController@showRentGuest');
        $router->get('/rentedOwnAccommodation/{id}', 'AccommodationController@showRentLandlord');

        $router->get('/filter/{filters}', 'AccommodationController@filter');
        $router->get('/localSearch/{location}', 'AccommodationController@localSearch');


    });


    $router->group(['prefix' => 'chat'], function () use ($router) {
        //$router->get('/', 'ChatController@index');
        $router->get('/user/{id}', 'ChatController@show');
        $router->get('/{id}', 'ChatController@showId');
        $router->get('/{id}/messages/{user_id}', 'ChatController@messages');
        $router->get('/{id1}/{id2}/{accommodation_id}', 'ChatController@chatExists');
        $router->get('/chatNotifications/{userId}', 'ChatController@notification');
        $router->post('/addMessage', 'ChatController@storeMessage');


    });

});
