<?php

namespace Database\Factories;

use App\Models\Accommodation;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccommodationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Accommodation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'accommodationType' => $this->faker->randomElement(['quarto', 'apartamento']),
            'rooms' => $this->faker->randomNumber(1),
            'bathRooms' => $this->faker->randomNumber(1),
            'area' => $this->faker->randomNumber(2),
            'solar' => $this->faker->randomElement(['N', 'S', 'E', 'O', 'NE', 'NO', 'SO', 'SE']),
            'wifi' => $this->faker->boolean,
            'clean' => $this->faker->boolean,
            'available' => $this->faker->boolean,
        ];
    }
}
