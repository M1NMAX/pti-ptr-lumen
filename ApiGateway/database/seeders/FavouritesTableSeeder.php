<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Favourites;

class FavouritesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Favourites::factory(\App\Favourites::class)->count(5)->create();
    }
}
