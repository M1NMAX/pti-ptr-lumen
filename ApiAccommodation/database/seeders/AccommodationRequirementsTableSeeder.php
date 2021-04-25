<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\AccommodationRequirements;

class AccommodationRequirementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AccommodationRequirements::factory(\App\AccommodationRequirements::class)->count(10)->create();
    }
}
