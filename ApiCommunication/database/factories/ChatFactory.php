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
            'landlord_id' => $this->faker->randomDigit,
            'guest_id' => $this->faker->randomDigit,
        ];
    }
}
