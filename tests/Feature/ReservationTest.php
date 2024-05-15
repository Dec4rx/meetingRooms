<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;
use App\Models\User;
use App\Models\MeetingRoom;
use App\Models\Reservation;

class ReservationTest extends TestCase
{
    public function testStoreReservation()
    {

        $user = User::factory()->create();
        $meetingRoom = MeetingRoom::factory()->create();
        $startTime = now();
        $endTime = $startTime->copy()->addHours(2);
        //Doesn't work with carbon due to datetime format
        $startTime = "2024-05-15T01:00:00";
        $endTime = "2024-05-15T02:00:00";

        $response = $this->postJson('/api/reservations', [
            'user_id' => $user->id,
            'meeting_room_id' => $meetingRoom->id,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ]);

        if ($response->status() !== 201) {
            dd($response->content()); // This will dump the response content if the status is not 201
        }

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'user_id',
                'meeting_room_id',
                'start_time',
                'end_time'
            ]);
    }

    public function testReleaseReservation()
    {   
        $reservation = Reservation::factory()->create([
            'end_time' => now()->addDays(1) // Future end time
        ]);

        $response = $this->patchJson("/api/reservations/{$reservation->id}/release");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'reservation' => [
                    'id',
                    'user_id',
                    'meeting_room_id',
                    'start_time',
                    'end_time', // Expect the current time
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    public function testShowPastReservations()
    {
        $user = User::factory()->create();
        $pastReservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'end_time' => now()->subHours(3) // Past end time
        ]);

        $response = $this->getJson("/api/reservations/{$user->id}/past");

        $response->assertStatus(200)
            ->assertJsonStructure([
                [
                    'start_time',
                    'end_time',
                    'meeting_room_id',
                    'meeting_room_name',
                ]
            ]);
    }
}
