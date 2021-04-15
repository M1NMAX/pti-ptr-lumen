<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;
    public $timestamps = false;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    
    public function definition()
    {
        return [      
            'chat_id' => $this->faker->randomDigit,
            'user_id' => $this->faker->randomDigit,
            'content' => $this->faker->sentence($nbWords = 6, $variableNbWords = true),
            'created_at' => date('Y-m-d H:i:s'),
        ];
    }

}
