<?php

namespace App\Http\Controllers;

use App\Models\MeetingRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class MeetingRoomController extends Controller
{
    /**
     * Retrieves all meeting rooms with their current occupancy status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexWithOccupancy()
    {
        $currentDateTime = Carbon::now();
    
        // Fetch all meeting rooms with active reservations at the current date and time
        $meetingRooms = MeetingRoom::with(['reservations' => function ($query) use ($currentDateTime) {
            $query->where('start_time', '<=', $currentDateTime)
                  ->where('end_time', '>=', $currentDateTime);
        }])->get();
    
        // Transform data to include occupancy status, reservation ID, user ID, and when the room is occupied until
        $meetingRooms = $meetingRooms->map(function ($meetingRoom) {
            $isOccupied = $meetingRoom->reservations->count() > 0;
            $activeReservation = $isOccupied ? $meetingRoom->reservations->first() : null;
    
            return [
                'id' => $meetingRoom->id,
                'name' => $meetingRoom->name,
                'capacity' => $meetingRoom->capacity,
                'is_occupied' => $isOccupied,
                'reservation_id' => $isOccupied ? $activeReservation->id : null,
                'user_id' => $isOccupied ? $activeReservation->user_id : null,  // Include the user ID if occupied
                'occupied_until' => $isOccupied ? $activeReservation->end_time : null
            ];
        });
    
        return response()->json($meetingRooms);
    }

    /**
     * Display a listing of the MeetingRoom
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $meetingRooms = MeetingRoom::all();

        $meetingRoom = $meetingRooms->map(function ($room) {
            return [
                'id' => $room->id,
                'name' => $room->name,
                'capacity' => $room->capacity
            ];
        });

        return response()->json($meetingRoom, 200);
    }

    /**
     * Store a new MeetingRoom
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'capacity' => 'required|integer|min:1',
            'name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['message', $validator->errors()], 400);
        }

        $validatedData = $validator->validated();

        $meetingRoom = MeetingRoom::create($validatedData);

        return response()->json([
            'id' => $meetingRoom->id,
            'name' => $meetingRoom->name,
            'capacity' => $meetingRoom->capacity
        ], 201);
    }

    /**
     * Update the MeetingRoom
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id The ID of the MeetingRoom to update
     * @return \Illuminate\Http\JsonResponsesonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'capacity' => 'sometimes|integer|min:1',
            'name' => 'sometimes|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();

        $meetingRoom = MeetingRoom::find($id);
        if (!$meetingRoom) {
            return response()->json(['message' => 'Meeting room not found'], 404);
        }

        $meetingRoom -> name = $validatedData['name'] ?? $meetingRoom -> name;
        $meetingRoom -> capacity = $validatedData['capacity'] ?? $meetingRoom -> capacity;
        $meetingRoom -> save();
        
        return response()->json([
            'name' => $meetingRoom->name,
            'capacity' => $meetingRoom->capacity
        ], 200);
    }


    /**
     * Display data from a MeetingRoom
     *
     * @param  int  $id  The ID of the MeetingRoom to show
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $meetingRoom = MeetingRoom::find($id);
        if (!$meetingRoom) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json([
            'id' => $meetingRoom->id,
            'name' => $meetingRoom->name,
            'capacity' => $meetingRoom->capacity
        ], 200);
    }


    /**
     * Remove a specific MeetingRoom
     *
     * @param  int  $id  The ID of the MeetingRoom to delete
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $meetingRoom = MeetingRoom::find($id);
        if (!$meetingRoom) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $meetingRoom->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
