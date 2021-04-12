<?php

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

$router->get('/', function () use ($router) {
    return 'Primeira API REST com o Lumen...' . $router->app->version();
});




 

$router->group(['prefix' => 'users'], function () use ($router) {
    $router->get('/', 'UserController@index');
    $router->get('/{users}', 'UserController@show');
    $router->post('/', 'UserController@store');
    $router->put('/{users}', 'UserController@update');
    $router->delete('/{users}', 'UserController@destroy');
});  

$router->group(['prefix' => 'alojamento'], function () use ($router) {
    /*getters*/
    $router->get('/', 'AlojamentoController@index');
    $router->get('/{id}', 'AlojamentoController@showId');

    $router->post('/', 'AlojamentoController@store');


    $router->put('/{id}/rate/{value}', 'AlojamentoController@rate');
    $router->put('/{id}', 'AlojamentoController@update');



    $router->delete('/{alojamento}', 'AlojamentoController@destroy');
    //$router->delete('/{caracteristica}', 'CaracteristicaController@deleteC');

    
    //Caracteristicas
    $router->put('/{id}/addCaracteristica', 'AlojamentoController@addCaracteristica');
    $router->get('/{id}/showCaracteristicas', 'AlojamentoController@showCaracteristicas');
    //$router->delete('/{caracteristica}', 'CaracteristicaController@deleteC');
});

$router->group(['prefix' => 'ac'], function () use ($router) {
    $router->post('/addCaract', 'ACController@addCaract');

});

$router->group(['prefix' => 'caracteristica'], function () use ($router) {
    $router->get('/', 'CaracteristicaController@index');
    $router->post('/', 'CaracteristicaController@store');
    $router->put('/{caracteristica}', 'CaracteristicaController@update');
    $router->delete('/{caracteristica}', 'CaracteristicaController@destroy');



    $router->get('/filter/{ids}', 'CaracteristicaController@filter');

});

$router->group(['prefix' => 'aluguer'], function () use ($router) {
    $router->get('/', 'AluguerController@index');
    $router->post('/', 'AluguerController@store');
    $router->put('/{aluguer}', 'AluguerController@update');
    $router->delete('/{aluguer}', 'AluguerController@destroy');
});

$router->group(['prefix' => 'aluguerpending'], function () use ($router) {
    $router->get('/', 'AluguerPendingController@index');
    $router->post('/', 'AluguerPendingController@store');
    $router->put('/{aluguer}', 'AluguerPendingController@update');
    $router->delete('/{aluguer}', 'AluguerPendingController@destroy');

    $router->delete('accept/{id}', 'AluguerPendingController@accept');
});