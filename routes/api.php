<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MeetingRoomController;
use App\Http\Controllers\ReservationController;
use App\Models\MeetingRoom;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::get('/meeting_rooms_list', [MeetingRoomController::class, 'indexWithOccupancy']);




//Routes Auth
Route::middleware('auth:api')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::delete('meeting_rooms/{id}/delete', [MeetingRoomController::class, 'destroy']);
    Route::put('/reservations/{id}/release', [ReservationController::class, 'release']);
    Route::get('/reservations/{user_id}/past', [ReservationController::class, 'showPastReservations']);
    Route::put('meeting_rooms_update/{id}', [MeetingRoomController::class, 'update']);
    Route::post('meeting_rooms_post', [MeetingRoomController::class, 'store']);
});