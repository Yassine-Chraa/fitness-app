<?php

use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EquipmentController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WorkOutController;
use App\Models\Program;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// group of all protected routes

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('equipments', EquipmentController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('meals', MealController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::apiResource('programs', ProgramController::class);
    Route::apiResource('workouts', WorkOutController::class);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/deleteAccount', [AuthController::class, 'deleteAccount']);
});

// this route is public

Route::post('/signUp', [AuthController::class, 'signUp']);
Route::post('/signIn', [AuthController::class, 'signIn']);
