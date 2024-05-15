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

Route::resource('meeting_rooms', MeetingRoomController::class);
Route::get('/meeting_rooms_list', [MeetingRoomController::class, 'indexWithOccupancy']);

Route::post('/reservations', [ReservationController::class, 'store']);
Route::patch('/reservations/{id}/release', [ReservationController::class, 'release']);
Route::get('/reservations/{user_id}/past', [ReservationController::class, 'showPastReservations']);

