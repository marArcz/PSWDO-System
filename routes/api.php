<?php

use App\Http\Controllers\CalamityController;
use App\Http\Controllers\InventoryTrackHistoryController;
use App\Http\Controllers\MapDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/inventory_histories",[InventoryTrackHistoryController::class,'store'])->name('api.inventory_histories.store');
Route::post("typhoons/create",[CalamityController::class,'store']);
Route::get("/maps/municipality/{name}/data",[MapDataController::class,'municipality'])->name('api.maps.municipality');
Route::get("/maps/municipality/{name}/typhoon/{typhoon}/report",[MapDataController::class,'report'])->name('api.maps.report');
Route::get("/maps/distributions/typhoon/{name}",[MapDataController::class,'distributions'])->name('api.distributions.typhoon');
