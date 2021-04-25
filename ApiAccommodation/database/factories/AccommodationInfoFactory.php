<?php

namespace Database\Factories;

use App\Models\AccommodationInfo;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccommodationInfoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AccommodationInfo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'accommodation_id' => $this->faker->randomNumber(1),
            'accommodationType' => $this->faker->randomElement(['Quarto', 'Apartamento', 'Moradia']),
            'rooms' => $this->faker->randomNumber(1),
            'bathRooms' => $this->faker->randomNumber(1),
            'area' => $this->faker->randomNumber(2),
            'solar' => $this->faker->randomElement(['N', 'S', 'E', 'O', 'NE', 'NO', 'SO', 'SE']),
            'wifi' => $this->faker->boolean,
            'clean' => $this->faker->boolean,
        ];
    }
}
