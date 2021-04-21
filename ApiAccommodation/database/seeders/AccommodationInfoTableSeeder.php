<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\AccommodationInfo;

class AccommodationInfoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Accommodation::factory(\App\AccommodationInfo::class)->count(10)->create();
    }
}
