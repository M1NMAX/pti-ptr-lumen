<?php

namespace Database\Factories;

use App\Models\Guest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GuestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Guest::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'college' => $this->faker->randomElement(['ISEG', 'FCUL', 'FCT', 'NOVA']),
            'gender'=> $this->faker->randomElement(['Masculino', 'Feminino']),
            'smoker' => $this->faker->boolean,
            'pets' => $this->faker->boolean,
        ];
    }
}
