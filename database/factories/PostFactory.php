<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::select('id')->get()->random()->id,
            'title' => ucfirst(fake()->words(4, true)),
            'body' => ucfirst(fake()->sentences(4, true)),
            'created_at' => fake()->dateTimeBetween('-30 days', now())
        ];
    }
}
