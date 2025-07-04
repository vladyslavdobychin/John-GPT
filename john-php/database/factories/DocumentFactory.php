<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Document>
 */
class DocumentFactory extends Factory
{
    /**
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
