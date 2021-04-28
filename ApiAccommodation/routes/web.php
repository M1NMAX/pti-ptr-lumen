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
    return 'First API REST with Lumen...' . $router->app->version();
});





$router->group(['prefix' => 'accommodation'], function () use ($router) {
    //-------------GETS----------------

    //BUSCAR TODOS OS ALOJAMENTOS
    $router->get('/', 'AccommodationController@index');
    //MOSTRAR ALOJAMENTO COM O ID
    $router->get('/{id}', 'AccommodationController@showId');
    //VER AS CARACTERISTICAS DO ALOJAMENTO
    $router->get('/{id}/showFeatures', 'AccommodationController@showFeatures');
    //VER OS ALUGUERES DO ALOJAMENTO (FUTURAMENTE AS DATAS INDISPONIVEIS)
    $router->get('/{id}/busyDates/', 'AccommodationController@busyDates');
    //VER OS COMENTARIOS DO ALOJAMENTO
    $router->get('/{id}/comments', 'AccommodationController@comments');


    //PESQUISAR PELA LOCALIZACAO DO ALOJAMENTO
    $router->get('/localSearch/{search}', 'AccommodationController@localSearch');
    //PESQUISAR PELOS ALOJAMENTOS DE UM LANDLORD
    $router->get('/landlord/{id}', 'AccommodationController@landlordSearch');
    //DISPONIBILIDADE DO ALOJAMENTO
    $router->get('/status/{id}', 'AccommodationController@status');


    //-------------POSTS----------------

    //ADICIONA O ALOJAMENTO
    $router->post('/', 'AccommodationController@store');

    //-------------PUTS----------------

    //RATE ALOJAMENTO
    $router->put('/{id}/rate/{value}', 'AccommodationController@rate');
    //UPDATE ALOJAMENTO
    $router->put('/{id}', 'AccommodationController@update');
    //ADICIONAR CARACTERISTICA
    $router->put('/{id}/addFeatures', 'AccommodationController@addFeatures');

    //-------------DELETES----------------

    //ELIMINA O ALOJAMENTO
    $router->delete('/{accommodation}', 'AccommodationController@destroy');
    //$router->delete('/{caracteristica}', 'CaracteristicaController@deleteC');

});

$router->group(['prefix' => 'comment'], function () use ($router) {
    //ADICIONA O COMENTÁRIO
    $router->post('/', 'CommentController@addComment');
});

$router->group(['prefix' => 'af'], function () use ($router) {
    //AINDA NAO PRECISEI DE POR NADA AQUI
});

$router->group(['prefix' => 'feature'], function () use ($router) {
    //-------------GETS----------------

    //BUSCAR TODAS AS CARACTERISTICAS
    $router->get('/', 'FeatureController@index');
    //FILTRAR PELAS CARACTERISTICAS DADAS NO ROUTE (EX: 2,3)
    $router->get('/filter/{ids}', 'FeatureController@filter');

    //-------------POSTS----------------

    //ADICIONAR CARACTERISTICA
    $router->post('/', 'FeatureController@store');

    //-------------PUTS----------------

    //UPDATE A CARACTERISTICA
    $router->put('/{feature}', 'FeatureController@update');

    //-------------DELETES----------------

    //ELIMINAR A CARACTERISTICA
    $router->delete('/{feature}', 'FeatureController@destroy');

});

$router->group(['prefix' => 'rental'], function () use ($router) {
    //-------------GETS----------------
    $router->get('/', 'RentalController@index');

    //-------------POSTS----------------

    $router->post('/', 'RentalController@store');

    //-------------PUTS----------------

    $router->put('/{rental}', 'RentalController@update');

    //-------------DELETES----------------

    $router->delete('/{rental}', 'RentalController@destroy');
});

$router->group(['prefix' => 'rentalpending'], function () use ($router) {
    //-------------GETS----------------

    $router->get('/', 'RentalPendingController@index');
    $router->get('/{idLandlord}', 'RentalPendingController@landlordIdSearch');

    //-------------POSTS----------------

    $router->post('/', 'RentalPendingController@store');
    $router->post('accept/{id}', 'RentalPendingController@accept');

    //-------------PUTS----------------

    $router->put('/{rental}', 'RentalPendingController@update');

    //-------------DELETES----------------

    $router->delete('/{id}', 'RentalPendingController@destroy');

});

$router->group(['prefix' => 'accommodationInfo'], function () use ($router) {
    //-------------GETS----------------

    $router->get('/{id}', 'AccommodationInfoController@show');


    //-------------POSTS----------------

    $router->post('/', 'AccommodationInfoController@store');

    //-------------PUTS----------------

    $router->put('/{accommodation_info}', 'AccommodationInfoController@update');

    //-------------DELETES----------------

    $router->delete('/{accommodation_info}', 'AccommodationInfoController@destroy');

});


$router->group(['prefix' => 'accommodationRequirements'], function () use ($router) {
    //-------------GETS----------------

    $router->get('/{id}', 'AccommodationRequirementsController@show');
    $router->get('/i/{id}', 'AccommodationRequirementsController@showId');

    //-------------POSTS----------------

    $router->post('/', 'AccommodationRequirementsController@store');

    //-------------PUTS----------------

    $router->put('/{accommodation_requirements}', 'AccommodationRequirementsController@update');

    //-------------DELETES----------------

    $router->delete('/{accommodation_requirements}', 'AccommodationRequirementsController@destroy');

});


