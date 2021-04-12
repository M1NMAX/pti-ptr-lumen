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
            'preco' => $this->faker->randomNumber($nbDigits = NULL, $strict = false),
            'coordenadas' => $this->faker->randomDigit,
        ];
    }
}
