<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\Auth\DashboardLoginController;
use App\Http\Controllers\Dashboard\Auth\DashboardRegisterController;
use Inertia\Inertia;

// Ruta de inicio (Welcome)
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// Rutas de autenticación para usuarios invitados (Welcome)
Route::middleware('guest')->group(function () {
    Route::controller(RegisterController::class)->group(function () {
        Route::get('/register', fn() => Inertia::render('Auth/Register'))->name('register');
        Route::post('/register', 'register')->name('register.store');
    });

    Route::controller(LoginController::class)->group(function () {
        Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
        Route::post('/login', 'login')->name('login.auth');
    });
});

// Cerrar sesión (Welcome)
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth')->name('logout');

// Rutas de autenticación para el Dashboard
Route::middleware('guest:dashboard')->group(function () {
    Route::get('/dashboard/login', fn() => Inertia::render('Dashboard/Auth/DashboardLogin'))->name('dashboard.login');
    Route::post('/dashboard/login', [DashboardLoginController::class, 'login'])->name('dashboard.login.auth');

    Route::get('/dashboard/register', fn() => Inertia::render('Dashboard/Auth/DashboardRegister'))->name('dashboard.register');
    Route::post('/dashboard/register', [DashboardRegisterController::class, 'register'])->name('dashboard.register.store');
});

// Cerrar sesión (Dashboard)
Route::post('/dashboard/logout', [DashboardLoginController::class, 'logout'])->middleware('auth:dashboard')->name('dashboard.logout');

// Ruta del Dashboard (protegida por autenticación específica del Dashboard)
Route::middleware('dashboard.auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});