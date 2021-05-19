<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Favourites;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            if ($request->input('api_token')) {
                return User::where('api_token', $request->input('api_token'))->first();
            }
        });

        //FAVOURITES
        Gate::define('remove-favourite', function($user){
            return $user->userable_type === "App\Models\Guest";
        });

        Gate::define('add-favourite', function ($user){
            return $user->userable_type === "App\Models\Guest";
        });
        //FAVOURITES

        //USERS
        Gate::define('view-users', function($user){
            return $user->userable_type === "App\Models\Admin";
        });

        Gate::define('show-user', function($user){
            return $user->userable_type === "App\Models\Admin" || $user->userable_type === "App\Models\Landlord";
        });

        Gate::define('destroy-user', function($user){
            return $user->userable_type === "App\Models\Admin";
        });

        Gate::define('update-user', function($user, $otherUser){
            // dd($user .'o'. $otherUser);
            return $user->id === $otherUser->id;
        });
    }
}
