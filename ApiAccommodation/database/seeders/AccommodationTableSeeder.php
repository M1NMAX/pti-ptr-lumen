<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Accommodation;
use App\Models\Comment;
use App\Models\RentalPending;

class AccommodationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Accommodation::factory(\App\Accommodation::class)
            ->has(Comment::factory(\App\Comment::class)->count(3))
            ->count(10)->create();
    }
}
