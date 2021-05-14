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

            'landlord_id' => $this->faker->randomDigit,
            'name' => $this->faker->secondaryAddress,
            'description' => $this->faker->realText(50,2),
            'price' => $this->faker->randomNumber(3),
            'address' => $this->faker->address,
            'location' => $this->faker->city,
            'latitude' => $this->faker->latitude(-60, 70),
            'longitude' => $this->faker->latitude(-150, 130),
            'available' => $this->faker->boolean,
        ];
    }
}
