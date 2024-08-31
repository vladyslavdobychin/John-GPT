<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = fake()->dateTimeBetween('-1 year', 'now');

        return [
            'title' => fake()->sentence(),
            'content' => fake()->optional()->paragraphs(10, true),
            'created_at' => $createdAt,
            'updated_at' => fake()->dateTimeBetween($createdAt, 'now')
        ];
    }
}
