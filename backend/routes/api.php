<?php

use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\AuthController;
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

// Route::post('/tokens/create', function (Request $request) {
//     $token = $request->user()->createToken($request->token_name);
//     return ['token' => $token->plainTextToken];
// });


// group of all protected routes

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('equipements', EquipementController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('meals', MealController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/delete_account', [AuthController::class, 'delete_account']);
});

// this route is public

Route::post('/sign_up', [AuthController::class, 'sign_up']);
Route::post('/sign_in', [AuthController::class, 'sign_in']);
