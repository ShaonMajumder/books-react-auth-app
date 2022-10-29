<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Api\V1\Auth\LoginController;
use App\Http\Controllers\BookController;

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

Route::post('login',[LoginController::class,'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function(){
    Route::any('logout', [LoginController::class, "logout"]);
    Route::prefix('books')->name('books.')->group(function(){
        Route::get('/', [BookController::class, "listBooks"]);
        Route::post('/add', [BookController::class, "addBook"]);
        Route::delete('/delete/{id}',  [BookController::class, "deleteBook"]);
    });
});

// Route::fallback(function () {
//     return response()->json(['error' => 'Not Found!'], 404);
// });
