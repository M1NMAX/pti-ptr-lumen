<?php

namespace Database\Factories;

use App\Models\Messagem;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessagemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Messagem::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [      
            'user_id' => $this->faker->randomDigit,
            'content' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
        ];
    }
}
