<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategorieController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WorkOutController;
use Illuminate\Support\Facades\Route;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

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
    Route::get('/users/total', [UserController::class, 'getTotal'])->name('users.total');
    Route::get('/users/cart/{id}', [UserController::class, 'getCart'])->name('users.cart.index');
    Route::post('/users/cart', [UserController::class, 'addProduct'])->name('users.cart.store');
    Route::delete('/users/cart/{user_id}/{product_id}', [UserController::class, 'deleteProduct'])->name('users.cart.destroy');
    Route::get('/users/dailyNutrition/{user_id}/{date}', [UserController::class, 'getDailyNutrition'])->name('users.dailyNutrition.index');
    Route::apiResource('users', UserController::class);

    Route::post('/products/rating', [ProductController::class, 'addReview'])->name('users.rating.store');
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategorieController::class);
    Route::apiResource('meals', MealController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::apiResource('programs', ProgramController::class);
    Route::apiResource('workouts', WorkOutController::class);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/deleteAccount', [AuthController::class, 'deleteAccount']);
    Route::post('upload', function (Request $request) {
        $url = Cloudinary::upload($request->file('imageFile')->getRealPath())->getSecurePath();
        return response()->json(['img_url' => $url]);
    });
});

Route::post('/signUp', [AuthController::class, 'signUp']);
Route::post('/signIn', [AuthController::class, 'signIn']);
