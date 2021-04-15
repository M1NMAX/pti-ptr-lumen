<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Feature;

class FeatureTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Feature::factory(\App\Feature::class)->create();
    }
}
