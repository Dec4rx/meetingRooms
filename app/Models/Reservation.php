<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_time', 'end_time', 'user_id', 'meeting_room_id'
    ];

    // Reservation belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Reservation belongs to a meeting_room
    public function meetingRoom()
    {
        return $this->belongsTo(MeetingRoom::class);
    }
}
