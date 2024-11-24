<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\LeMondeController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/json', [ArticleController::class, 'indexJson']);
//Le Monde
Route::get('/le-monde/headlines', [LeMondeController::class, 'showHeadlines']);
Route::get('/le-monde/headlines/json', [LeMondeController::class, 'showHeadlinesJson']);


