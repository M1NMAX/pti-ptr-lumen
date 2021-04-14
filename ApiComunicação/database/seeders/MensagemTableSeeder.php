<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mensagem;

class MensagemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Mensagem::factory(\App\Mensagem::class)->create();
    }
}
