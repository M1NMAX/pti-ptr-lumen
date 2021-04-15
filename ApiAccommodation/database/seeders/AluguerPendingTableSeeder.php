<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\AluguerPending;

class AluguerPendingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AluguerPending::factory(\App\AluguerPending::class)->create();
    }
}
