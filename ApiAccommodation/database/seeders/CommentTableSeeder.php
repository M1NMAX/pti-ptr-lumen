<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Comment;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::factory(\App\Comment::class)->count(10)->create();
    }
}
