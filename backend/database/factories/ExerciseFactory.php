<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->title(),
            'img' => fake()->randomElement([
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
                'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
                'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
                'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
                'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
                'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
                'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
                'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25'
            ]),
            'description' => fake()->text(),
            'api_id' => fake()->imageUrl(),
            'rest' => fake()->numberBetween(2, 30),
            'reps' => fake()->numberBetween(2, 30),
            'sets' => fake()->numberBetween(2, 30),
            'category' => fake()->randomElement(["a", "b", "c", "d", "e", "f"]),
            'state' => "unstarted",
        ];
    }
}
