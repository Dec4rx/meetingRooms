<?php

namespace App\Http\Controllers;


use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class ReservationController extends Controller
{
    /**
     * Create a Reservation
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'meeting_room_id' => 'required|exists:meeting_rooms,id',
            'start_time' => 'required|date',
            'end_time' => [
                'required',
                'date',
                'after:start_time',
                'before_or_equal:' . date('Y-m-d H:i:s', strtotime($request->start_time . ' +2 hours'))
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();

        $reservation = Reservation::create($validatedData);

        return response()->json([
            'id' => $reservation->id,
            'user_id' => $reservation->user_id,
            'meeting_room_id' => $reservation->meeting_room_id,
            'start_time' => $reservation->start_time,
            'end_time' => $reservation->end_time
        ], 201);
    }

    /**
     * Release a reservation by setting end_time to current time.
     *
     * @param  int  $id  The ID of the reservation to release.
     * @return \Illuminate\Http\JsonResponse
     */
    public function release($id)
    {
        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        // Update end_time to current time
        $reservation->end_time = now();
        $reservation->save();

        return response()->json([
            'message' => 'Reservation released successfully',
            'reservation' => $reservation
        ], 200);
    }

    /**
     * Display a list of past reservations for a specific user.
     *
     * @param  Request  $request
     * @param  int  $id The ID of the User fetch reservations
     * @return JsonResponse
     */
    public function showPastReservations($user_id)
    {
        if (!$user_id) {
            return response()->json(['message' => 'User ID is required'], 400);
        }

        $currentDateTime = Carbon::now();

        // Fetch reservations that have ended and belong to the specified user
        $reservations = Reservation::with('meetingRoom')
            ->where('user_id', $user_id)
            ->where('end_time', '<', $currentDateTime)
            ->get(['start_time', 'end_time', 'meeting_room_id'])
            ->map(function ($reservation) {
                // Return the data including the name of the meeting room
                return [
                    'start_time' => $reservation->start_time,
                    'end_time' => $reservation->end_time,
                    'meeting_room_id' => $reservation->meeting_room_id,
                    'meeting_room_name' => $reservation->meetingRoom->name // Accessing the name from the related MeetingRoom model
                ];
            });

        return response()->json($reservations);
    }
}
