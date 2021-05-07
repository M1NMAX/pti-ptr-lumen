<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Guest;
use App\Models\Landlord;
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

        // $type = $this->faker->randomElement(['App\Models\Guest', 'App\Models\Landlord']);
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'username' => $this->faker->userName,
            'password' => Hash::make('password'),
            'birthdate' => $this->faker->date(),
            // 'userable_id' => $type === 'App\Models\Guest'?
            //                 Guest::factory(\App\Models\Guest::class) : Landlord::factory(\App\Models\Landlord::class),
            // 'userable_type' =>$type,
        ];
    }
}
