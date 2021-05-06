<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;


use App\Models\Guest;

class GuestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Guest::factory(\App\Guest::class)->count(5)->create();
    }
}
