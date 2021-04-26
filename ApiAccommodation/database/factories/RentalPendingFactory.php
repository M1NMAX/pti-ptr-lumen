<?php

namespace Database\Factories;

use App\Models\RentalPending;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentalPendingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RentalPending::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'landlord_id' => $this->faker->randomDigit,
            'accommodation_id' => $this->faker->randomDigit,
            'accommodation_name' =>$this->faker->secondaryAddress,
            'user_id' => $this->faker->randomDigit,
            'user_name' => $this->faker->name(),
            'price' => $this->faker-> randomNumber(3),
            'beginDate' => $this->faker->date($format = 'Y-m', $max = 'now'),
            'endDate' => $this->faker->date($format = 'Y-m', $max = 'now'),
        ];
    }
}
