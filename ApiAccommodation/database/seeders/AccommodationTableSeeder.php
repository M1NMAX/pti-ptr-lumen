<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Accommodation;

class AccommodationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Accommodation::factory(\App\Accommodation::class)->create();
    }
}
