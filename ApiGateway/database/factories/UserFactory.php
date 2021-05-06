<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Guest;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'username' => $this->faker->userName,
            'password' => Hash::make('password'),
            'birthdate' => $this->faker->date(),
            'userable_id' => Guest::factory(\App\Models\Guest::class),
            'userable_type' =>'App\Models\Guest',
        ];
    }
}
