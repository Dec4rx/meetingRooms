<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\User;
use App\Models\MeetingRoom;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
     /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Reservation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Assumes you have a UserFactory
            'meeting_room_id' => MeetingRoom::factory(), // Assumes you have a MeetingRoomFactory
            'start_time' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'end_time' => function (array $attributes) {
                return $this->faker->dateTimeBetween($attributes['start_time'], '+1 week');
            }
        ];
    }
}
