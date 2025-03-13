<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureDashboardAuthenticated
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('dashboard')->check()) {
            return redirect()->route('dashboard.login');
        }

        return $next($request);
    }
}