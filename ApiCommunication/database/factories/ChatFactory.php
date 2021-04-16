<?php

namespace Database\Factories;

use App\Models\Chat;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Chat::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public $timestamps = false;
    public function definition()
    {
        return [      
            'user_id1' => $this->faker->randomDigit,
            'user_id2' => $this->faker->randomDigit,
        ];
    }
}
