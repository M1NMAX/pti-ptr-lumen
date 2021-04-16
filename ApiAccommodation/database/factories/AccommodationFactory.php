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

            'name' => $this->faker->secondaryAddress,
            'description' => $this->faker->realText($maxNbChars = 50, $indexSize = 2),
            'price' => $this->faker->randomNumber(3),
            'streetName' => $this->faker->streetName,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'latitude' => $this->faker->latitude($min = -90, $max = 90),
            'longitude' => $this->faker->latitude($min = -180, $max = 180),
        ];
    }
}