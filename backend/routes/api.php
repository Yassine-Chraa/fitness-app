<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategorieController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\ExerciseController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\API\ReactionController;
use App\Http\Controllers\API\ReplyController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WorkoutController;
use App\Http\Controllers\API\WorkoutExerciseController;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Reply;
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
    Route::get('/users/dailyNutrition/{user_id}', [UserController::class, 'getLastNutritions'])->name('users.dailyNutrition.last7Day');
    Route::post('/users/dailyNutrition/item/{user_id}/{date}', [UserController::class, 'addFood'])->name('users.dailyNutrition.item.store');
    Route::put('/users/dailyNutrition/item/{daily_nutrition_id}/{food_id}', [UserController::class, 'updateFood'])->name('users.dailyNutrition.item.update');
    Route::delete('/users/dailyNutrition/item/{daily_nutrition_id}/{food_id}', [UserController::class, 'deleteFood'])->name('users.dailyNutrition.item.destroy');
    Route::get('/users/weights/{user_id}', [UserController::class, 'getWeights'])->name('users.weights.index');
    Route::post('/users/weights/{user_id}', [UserController::class, 'addWeight'])->name('users.weights.store');
    Route::put('/users/weights/{user_id}', [UserController::class, 'updateWeight'])->name('users.weights.update');
    Route::delete('/users/weights/{user_id}/{date}', [UserController::class, 'deleteWeight'])->name('users.weights.destory');
    Route::get('/users/programs', [UserController::class, 'getPrograms'])->name('users.programs.index');
    Route::post('/users/programs', [UserController::class, 'createProgram'])->name('users.programs.post');
    Route::put('/users/programs/{program_id}', [UserController::class, 'updateProgram'])->name('users.programs.update');
    Route::delete('/users/programs/{program_id}', [UserController::class, 'deleteProgram'])->name('users.programs.delete');
    Route::post('/users/programs/enroll', [UserController::class, 'enrollProgram'])->name('users.programs.enroll');

    Route::apiResource('users', UserController::class);

    Route::post('/products/rating', [ProductController::class, 'addReview'])->name('users.rating.store');
    Route::get('/products/total', [ProductController::class, 'getTotal'])->name('products.total');
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategorieController::class);
    Route::apiResource('feedbacks', FeedbackController::class);
    Route::get('/programs/total', [ProgramController::class, 'getTotal'])->name('programs.total');
    Route::apiResource('programs', ProgramController::class);

    Route::apiResource('images', ImageController::class);

    Route::apiResource('posts', PostController::class);
    Route::apiResource('reactions', ReactionController::class);
    Route::get('/getReactionByPostUserId/{user_id}/{post_id}', [ReactionController::class, 'getReactionByPostUserId']);
    Route::delete('/deleteReactionByPostUserId/{user_id}/{post_id}', [ReactionController::class, 'deleteReactionByPostUserId']);
    Route::get('/postsByUserId/{user_id}', [PostController::class, 'getPostByUserId']);
    Route::apiResource('comments', CommentController::class);
    Route::get('/commentsByPostId/{user_id}', [CommentController::class, 'getCommentByPostId']);
    Route::apiResource('replies', ReplyController::class);
    Route::get('/repliesByCommentId/{user_id}', [ReplyController::class, 'getReplyByCommentId']);

    Route::post('/workouts/exercises/{workout_id}', [WorkoutController::class, 'addExercise'])->name('workouts.exercises.store');
    Route::apiResource('workouts', WorkoutController::class);
    Route::apiResource('workoutexercises', WorkoutExerciseController::class);

    Route::get('/exercises/total', [ExerciseController::class, 'getTotal'])->name('exercises.total');
    Route::apiResource('exercises', ExerciseController::class);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/deleteAccount', [AuthController::class, 'deleteAccount']);
    Route::post('upload', function (Request $request) {
        $url = Cloudinary::upload($request->file('imageFile')->getRealPath())->getSecurePath();
        return response()->json(['img_url' => $url]);
    });
});

Route::post('/signUp', [AuthController::class, 'signUp']);
Route::post('/signIn', [AuthController::class, 'signIn']);
