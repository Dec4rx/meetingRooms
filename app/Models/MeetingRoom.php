<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'capacity'
    ];

    // A meeting_room can have many reservations
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
