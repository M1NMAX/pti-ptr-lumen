<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Alojamento;

class AlojamentoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Alojamento::factory(\App\Alojamento::class)->count(10)->create();
    }
}
