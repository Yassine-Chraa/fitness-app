<?php

use App\Http\Controllers\Auth\ResetPasswordUserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::group(['middleware' => ['auth']], function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/{any}', [App\Http\Controllers\DashboardController::class, 'index'])->where('any', '.*');

    Route::get('/mainApp', [App\Http\Controllers\MainAppController::class, 'index'])->name('mainApp');
    Route::get('/mainApp/{any}', [App\Http\Controllers\MainAppController::class, 'index'])->where('any', '.*');
});

Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
