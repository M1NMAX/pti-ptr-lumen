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
            'district' => $this->faker->state,
            'county' => $this->faker->cityPrefix,
            'latitude' => $this->faker->latitude(-90, 90),
            'longitude' => $this->faker->latitude(-180, 180),
            'available' => $this->faker->boolean,
        ];
    }
}
