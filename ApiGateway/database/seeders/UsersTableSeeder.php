<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Guest;
use App\Models\Landlord;
use App\Models\Favourites;
use Illuminate\Database\Eloquent\Factories\Sequence;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(\App\User::class)->count(20)->state(new Sequence(
            ['userable_type' => 'App\Models\Guest', 'userable_id'=> Guest::factory(\App\Models\Guest::class)],
            ['userable_type' => 'App\Models\Landlord', 'userable_id'=> Landlord::factory(\App\Models\Landlord::class)],
        ))->create();
    }
}
