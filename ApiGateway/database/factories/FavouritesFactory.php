<?php

namespace Database\Factories;

use App\Models\Favourites;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavouritesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Favourites::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber(1),
            'accommodation_id' => $this->faker->randomNumber(1),

        ];
    }
}
