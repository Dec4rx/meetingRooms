<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\MeetingRoom;

class MeetingRoomTest extends TestCase
{
   public function testStore()
    {
        $data = [
            'name' => 'Conference Room A',
            'capacity' => 10
        ];

        $response = $this->postJson('/api/meeting_rooms', $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'name' => 'Conference Room A',
                     'capacity' => 10
                 ]);
    }

    public function testUpdate()
    {
        $meetingRoom = MeetingRoom::factory()->create();

        $data = [
            'name' => 'Updated Name'
        ];

        $response = $this->patchJson("/api/meeting_rooms/{$meetingRoom->id}", $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'updated' => true,
                     'name'=> 'Updated Name'
                 ]);

        
    }

    public function testShow()
    {
        $meetingRoom = MeetingRoom::factory()->create();

        $response = $this->get("/api/meeting_rooms/{$meetingRoom->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $meetingRoom->id,
                     'name' => $meetingRoom->name,
                     'capacity' => $meetingRoom->capacity
                 ]);
    }

    public function testDestroy()
    {
        $meetingRoom = MeetingRoom::factory()->create();

        $response = $this->delete("/api/meeting_rooms/{$meetingRoom->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Deleted successfully']);
    }
}
