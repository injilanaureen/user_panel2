<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated 
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (Auth::check() && !$request->is('dashboard')) {
            return redirect('/dashboard');
        }
    
        return $next($request);
    }
    
}
