<?php

use App\Http\Controllers\AssistanceDistributionController;
use App\Http\Controllers\BarangayAdminController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\CalamityController;
use App\Http\Controllers\DistributionController;
use App\Http\Controllers\DswdAdminController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InventoryTrackHistoryController;
use App\Http\Controllers\LguAdminController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UnitController;
use App\Models\BarangayAdmin;
use App\Models\InventoryTrackHistory;
use Illuminate\Foundation\Application;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return redirect(route('pswdo.login'));
})->name('home');


/* pswdo admin routes */
Route::prefix('/pswdo')
    ->name('pswdo.')
    ->group(function () {
        // auth routes
        Route::get('/login', [DswdAdminController::class, "login"])->name('login')->middleware(['guest']);
        Route::post('/store', [DswdAdminController::class, "store"])->name('store');
        Route::get('/register', [DswdAdminController::class, "register"])->name('register');
        Route::post('/create', [DswdAdminController::class, "create"])->name('create');
        Route::post('/logout', [DswdAdminController::class, "logout"])->name('logout');
        // end of auth routes

        Route::middleware(['auth:dswd'])->group(function () {
            Route::middleware(['role:super_admin'])->group(function(){
                Route::get('/staffs', [StaffController::class,'index'])->name('staffs.index');
                Route::get('/staffs/create', [StaffController::class,'create'])->name('staffs.create');
                Route::post('/staffs', [StaffController::class,'store'])->name('staffs.store');
                Route::get('/staffs/{staff}/edit', [StaffController::class,'edit'])->name('staffs.edit');
                Route::patch('/staffs/{staff}', [StaffController::class,'update'])->name('staffs.update');
                Route::delete('/staffs/{staff}', [StaffController::class,'destroy'])->name('staffs.destroy');
            });
            Route::get('/dashboard', [DswdAdminController::class, "dashboard"])->name('dashboard');
            Route::resource('municipalities.barangays', BarangayController::class)->shallow();
            Route::get("/municipalities/barangays/all", [BarangayController::class, 'all'])->name('barangays.all');
            Route::resource('municipalities', MunicipalityController::class);
            Route::resource('calamities', CalamityController::class);
            Route::resource('reports', ReportController::class);
            Route::resource('reports.distributions', DistributionController::class)->shallow();
            Route::resource('distributions', AssistanceDistributionController::class)->shallow();
            Route::patch('distributions/{distribution}/distributed', [DistributionController::class,'distributed'])->name('distributions.distributed');
            Route::get('distributions/archived/listing', [DistributionController::class,'archived'])->name('distributions.archived');
            Route::patch('distributions/{distribution}/declined', [DistributionController::class,'declined'])->name('distributions.declined');
            Route::get('/calculator/distributions', [DistributionController::class,'calculator'])->name('distributions.calculator');
            Route::resource('inventories', InventoryController::class);
            Route::resource('inventory_histories', InventoryTrackHistoryController::class);
            Route::resource('units', UnitController::class);
            Route::resource('reports', ReportController::class);
            Route::post('/reports/import',[ReportController::class,'import'])->name('reports.import');
            Route::resource('barangay.barangayAdmin', BarangayAdminController::class)->shallow();
        });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
