<?php

namespace App\Http\Controllers; // Namespace correcto

use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}