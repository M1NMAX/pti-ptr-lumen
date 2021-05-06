<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Favourites;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(\App\User::class)
        ->has(Favourites::factory(\App\Favourites::class)->count(3))->count(10)->create();
    }
}
