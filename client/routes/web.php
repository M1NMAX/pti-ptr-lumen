<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

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

$router->get('/register', function () {
    return view('register');
});

$router->get('/login', function () {
    return view('login');
});

$router->get('/profileUser', function () {
    return view('profileUser');
});

$router->get('/registerAlojamento', function () {
    return view('registerAlojamento');
});

// $router->get('login', ['as' => 'login', function () {
//     $state = Str::random(40);

//     $query = http_build_query([
//         'client_id'=>env('CLIENT_ID'),
//         'redirect_url'=>env('REDIRECT_URL'),
//         'response_type'=>'code',
//         'scope'=>'',
//         'state'=>$state,
//     ]);

//     return redirect('http://localhost:8010/v1/oauth/token?'.$query);
//     //
// }]);

// $router->get('callback', function(Request $request){
//     dd($request->all());
// });

$router->get('grant_client', function(){
    $response = Http::post(env('APIGATEWAY_URL').'v1/oauth/token',[
        'grant_type' =>env('GRANT_TYPE'),
        'client_id' => env('CLIENT_ID'),
        'client_secret' => env('CLIENT_SECRET'),
        'scope'=>''
    ]);

    dd($response->json());

});

$router->get('email', function(){
    $response = Http::withToken(env('ACCESS_TOKEN'))->get(env('APIGATEWAY_URL').'email');

    dd($response->json());
    // return view('test', ['response'=> $response,]);
});

$router->get('fake', function(){
        $response=Http::post(env('APIGATEWAY_URL').'register',[
            'name'=> 'max',
            'email'=>'max@gmail.com',

        ] );

            dd($response->json());

});
