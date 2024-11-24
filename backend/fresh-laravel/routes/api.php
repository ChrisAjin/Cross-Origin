<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeMondeController;
use App\Http\Controllers\LequipeController;
use App\Http\Controllers\LeParisienController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/lemonde', [LeMondeController::class, 'showHeadlinesJson']);
Route::get('/lequipe', [LequipeController::class, 'getArticles']);
Route::get('/leparisien', [LeParisienController::class, 'getArticles']);
