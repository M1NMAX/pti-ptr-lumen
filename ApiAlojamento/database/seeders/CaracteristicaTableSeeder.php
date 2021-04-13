<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Caracteristica;

class CaracteristicaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Caracteristica::factory(\App\Caracteristica::class)->create();
    }
}
