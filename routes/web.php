<?php

use App\Http\Controllers\AlternatifController;
use App\Http\Controllers\PenilaianController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KriteriaController;

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
    return redirect('/dashboard');
});



Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Main/Dashboard');
    })->name('dashboard');

    Route::resource('item', ItemController::class)->names([
        'index' => 'item',
        'create' => 'item.create',
        'store' => 'item.store',
        'show' => 'item.show',
        'edit' => 'item.edit',
        'update' => 'item.update',
        'destroy' => 'item.destroy',
    ]);

    Route::resource('kriteria', KriteriaController::class)->names([
        'index' => 'kriteria',
        'create' => 'kriteria.create',
        'store' => 'kriteria.store',
        'show' => 'kriteria.show',
        'edit' => 'kriteria.edit',
        'update' => 'kriteria.update',
        'destroy' => 'kriteria.destroy',
    ]);

    // Route::resource('kriteria/sub-kriteria', SubKriteriaController::class)->names([
    //     'index' => 'subKriteria',
    //     'create' => 'subKriteria.create',
    //     'store' => 'subKriteria.store',
    //     'show' => 'subKriteria.show',
    //     'edit' => 'subKriteria.edit',
    //     'update' => 'subKriteria.update',
    //     'destroy' => 'subKriteria.destroy',
    // ]);

    Route::resource('alternatif', AlternatifController::class)->names([
        'index' => 'alternatif',
        'create' => 'alternatif.create',
        'store' => 'alternatif.store',
        'show' => 'alternatif.show',
        'edit' => 'alternatif.edit',
        'update' => 'alternatif.update',
        'destroy' => 'alternatif.destroy',
    ]);

    Route::controller(PenilaianController::class)->group(function () {
        Route::get('/penilaian', 'index')->name('penilaian');
        Route::post('/penilaian', 'store')->name('');
    });
    // Route::prefix('penilaian')->group(function () {
    //     Route::get('/', function () {
    //         return Inertia::render('Main/Penilaian');
    //     })->name('penilaian');
    // });


    Route::get('/hasil-akhir', function () {
        return Inertia::render('Main/HasilAkhir');
    })->name('hasil-akhir');

    Route::get('/perhitungan', function () {
        return Inertia::render('Main/Perhitungan');
    })->name('perhitungan');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
