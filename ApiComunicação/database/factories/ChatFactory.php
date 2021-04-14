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
    public function definition()
    {
        return [      
            'senhorio_id' => $this->faker->randomDigit,
            'hospede_id' => $this->faker->randomDigit,
        ];
    }
}
