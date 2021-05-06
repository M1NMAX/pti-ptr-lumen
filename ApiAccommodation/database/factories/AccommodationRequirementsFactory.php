<?php

namespace Database\Factories;

use App\Models\AccommodationRequirements;
use App\Models\Accommodation;
use Illuminate\Database\Eloquent\Factories\Factory;


class AccommodationRequirementsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AccommodationRequirements::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'accommodation_id' => $this->faker->unique()->numberBetween(1, 10),
            'ageRangeBot' => $this->faker->randomNumber(2),
            'ageRangeTop' => $this->faker->randomNumber(2),
            'gender' => $this->faker->randomElement(['Masculino', 'Feminino', 'Misto', 'Indiferente']),
            'smoker' => $this->faker->boolean,
            'pets' => $this->faker->boolean,
        ];
    }
}
