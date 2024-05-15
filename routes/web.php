<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{path?}', function () {
    return view('welcome');
});
Route::get('/{path?}/{path2?}', function () {
    return view('welcome');
});
Route::get('/{path?}/{path2?}/{path3?}', function () {
    return view('welcome');
});