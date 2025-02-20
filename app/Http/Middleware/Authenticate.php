<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate 
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect('/'); // Redirect to welcome page if not authenticated
        }

        return $next($request);
    }
}
