<?php

use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\EquipementController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\UserController;
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
/*Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token' => $token->plainTextToken];
});*/

Route::apiResource('users', UserController::class)->middleware('auth:sanctum');
Route::apiResource('equipements', EquipementController::class)->middleware('auth:sanctum');
Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');
Route::apiResource('meals', MealController::class)->middleware('auth:sanctum');
Route::apiResource('activities', ActivityController::class)->middleware('auth:sanctum');
Route::apiResource('feedbacks', FeedbackController::class)->middleware('auth:sanctum');
