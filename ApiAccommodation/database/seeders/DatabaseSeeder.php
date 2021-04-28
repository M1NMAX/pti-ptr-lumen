<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*$this->call(AccommodationTableSeeder::class);
        $this->call(FeatureTableSeeder::class);
        $this->call(RentalPendingTableSeeder::class);
        $this->call(CommentTableSeeder::class);
        $this->call(AccommodationInfoTableSeeder::class);*/
        $this->call(AccommodationRequirementsTableSeeder::class);
        
    }
}
