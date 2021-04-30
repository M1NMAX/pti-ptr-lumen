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
    return "Primeira API feita com " . $router->app->version() ;
});


$router->group(['prefix' => 'message'], function () use($router){
    $router->get('/','MessageController@index');
    $router->get('/{id}', 'MessageController@show');


    $router->post('/addMessage','MessageController@addMessage');

});

$router->group(['prefix' => 'chat'], function () use($router){
    $router->get('/','ChatController@index');
    $router->get('/{id}', 'ChatController@show');
    $router->get('user/{id}', 'ChatController@showUserId');
    $router->get('/{id}/messages', 'ChatController@showMsn');
    $router->get('/notifications/{user_id}', 'ChatController@notificationCheck');

    $router->get('/{id1}/{id2}', 'ChatController@chatExists');

    $router->post('/','ChatController@store');



});