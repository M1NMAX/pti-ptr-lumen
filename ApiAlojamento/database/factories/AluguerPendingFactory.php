<?php

namespace Database\Factories;

use App\Models\AluguerPending;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class AluguerPendingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AluguerPending::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'senhorio_id' => $this->faker->randomDigit,
            'alojamento_id' => $this->faker->randomDigit,
            'user_id' => $this->faker->randomDigit,
            'preco' => $this->faker-> randomNumber(3),
            'dataInicio' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'dataFim' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
        ];
    }
}
