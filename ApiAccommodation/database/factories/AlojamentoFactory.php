<?php

namespace Database\Factories;

use App\Models\Alojamento;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlojamentoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alojamento::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'name' => $this->faker->secondaryAddress,
            'descricao' => $this->faker->realText($maxNbChars = 50, $indexSize = 2),
            'preco' => $this->faker->randomNumber(3),
            'streetName' => $this->faker->streetName,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'latitude' => $this->faker->latitude($min = -90, $max = 90),
            'longitude' => $this->faker->latitude($min = -180, $max = 180),
        ];
    }
}
