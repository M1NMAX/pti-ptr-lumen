<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'user_id' => $this->faker->numberBetween(1, 10),
            'accommodation_id' => $this->faker->numberBetween(1,10),
            'rate' => $this->faker->numberBetween(1, 5),
            'content' => $this->faker->realText($maxNbChars = 20, $indexSize = 2),

        ];
    }
}
