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



 

$router->group(['prefix' => 'alojamento'], function () use ($router) {
    //-------------GETS----------------

    //BUSCAR TODOS OS ALOJAMENTOS
    $router->get('/', 'AlojamentoController@index');
    //MOSTRAR ALOJAMENTO COM O ID
    $router->get('/{id}', 'AlojamentoController@showId');
    //VER AS CARACTERISTICAS DO ALOJAMENTO
    $router->get('/{id}/showCaracteristicas', 'AlojamentoController@showCaracteristicas');
    //VER OS ALUGUERES DO ALOJAMENTO (FUTURAMENTE AS DATAS INDISPONIVEIS)
    $router->get('/busyDates/{id}', 'AlojamentoController@busyDates');

    //-------------POSTS----------------

    //ADICIONA O ALOJAMENTO
    $router->post('/', 'AlojamentoController@store');

    //-------------PUTS----------------

    //RATE ALOJAMENTO
    $router->put('/{id}/rate/{value}', 'AlojamentoController@rate');
    //UPDATE ALOJAMENTO
    $router->put('/{id}', 'AlojamentoController@update');
    //ADICIONAR CARACTERISTICA
    $router->put('/{id}/addCaracteristica', 'AlojamentoController@addCaracteristica');

    //-------------DELETES----------------

    //ELIMINA O ALOJAMENTO
    $router->delete('/{alojamento}', 'AlojamentoController@destroy');
    //$router->delete('/{caracteristica}', 'CaracteristicaController@deleteC');

});

$router->group(['prefix' => 'ac'], function () use ($router) {
    //AINDA NAO PRECISEI DE POR NADA AQUI
});

$router->group(['prefix' => 'caracteristica'], function () use ($router) {
    //-------------GETS----------------

    //BUSCAR TODAS AS CARACTERISTICAS
    $router->get('/', 'CaracteristicaController@index');
    //FILTRAR PELAS CARACTERISTICAS DADAS NO ROUTE (EX: 2,3)
    $router->get('/filter/{ids}', 'CaracteristicaController@filter');

    //-------------POSTS----------------

    //ADICIONAR CARACTERISTICA
    $router->post('/', 'CaracteristicaController@store');

    //-------------PUTS----------------

    //UPDATE A CARACTERISTICA
    $router->put('/{caracteristica}', 'CaracteristicaController@update');

    //-------------DELETES----------------

    //ELIMINAR A CARACTERISTICA
    $router->delete('/{caracteristica}', 'CaracteristicaController@destroy');

});

$router->group(['prefix' => 'aluguer'], function () use ($router) {
    //-------------GETS----------------
    $router->get('/', 'AluguerController@index');

    //-------------POSTS----------------

    $router->post('/', 'AluguerController@store');

    //-------------PUTS----------------

    $router->put('/{aluguer}', 'AluguerController@update');
    
    //-------------DELETES----------------

    $router->delete('/{aluguer}', 'AluguerController@destroy');
});

$router->group(['prefix' => 'aluguerpending'], function () use ($router) {
    //-------------GETS----------------

    $router->get('/', 'AluguerPendingController@index');
    $router->get('/{idSenhorio}', 'AluguerPendingController@senhorioIdSearch');
    
    //-------------POSTS----------------

    $router->post('/', 'AluguerPendingController@store');
    $router->post('accept/{id}', 'AluguerPendingController@accept');
    
    //-------------PUTS----------------

    $router->put('/{aluguer}', 'AluguerPendingController@update');

    //-------------DELETES----------------
    
    $router->delete('/{aluguer}', 'AluguerPendingController@destroy');
    
});