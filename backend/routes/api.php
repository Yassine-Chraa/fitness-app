<?php

use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EquipementController;
use App\Http\Controllers\API\EquipmentController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\ResetPasswordController;
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
    Route::apiResource('equipments', EquipmentController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('meals', MealController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/deleteAccount', [AuthController::class, 'deleteAccount']);
});

// this route is public

Route::post('/signup', [AuthController::class, 'signUp']);
Route::post('/signin', [AuthController::class, 'signIn']);

Route::post('sendEmail',  [ForgotPasswordController::class, 'sendEmail']);
Route::post('checkCode', [CodeCheckController::class, 'checkCode']);
Route::post('newPassword', [ResetPasswordController::class, 'resetPassword']);
