<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\RentalPending;

class RentalPendingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RentalPending::factory(\App\RentalPending::class)->count(10)->create();
    }
}
