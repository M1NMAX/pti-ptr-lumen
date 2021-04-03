<?php
use App\Http\Controllers\UsersController;
use App\Models\User;

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

// $router->get('/key', function() {
//     return \Illuminate\Support\Str::random(32);
// });



$router->post('/register', 'UsersController@register');

$router->get('/email', function() {
    return User::where('id', 3)->first();
});
