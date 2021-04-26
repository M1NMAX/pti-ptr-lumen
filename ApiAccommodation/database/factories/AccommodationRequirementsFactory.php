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
            'ageRangeBot' => $this->faker->randomElement(['Quarto', 'Apartamento', 'Moradia']),
            'ageRangeTop' => $this->faker->randomNumber(1),
            'gender' => $this->faker->randomElement(['Masculino', 'Feminino', 'Misto', 'Indiferente']),
            'smoker' => $this->faker->boolean,
            'pets' => $this->faker->boolean,
        ];
    }
}
