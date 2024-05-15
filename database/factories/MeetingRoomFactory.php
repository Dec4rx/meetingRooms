<?php

namespace Database\Factories;

use App\Models\MeetingRoom;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingRoom>
 */
class MeetingRoomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MeetingRoom::class;

    /**
     * 
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),  // Generate a random room name
            'capacity' => $this->faker->numberBetween(5, 50)  // Random capacity between 5 and 50
        ];
    }
}
