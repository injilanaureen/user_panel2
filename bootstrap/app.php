<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\RedirectIfAuthenticated;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    // ->withMiddleware(function (Middleware $middleware) {
    //     $middleware->alias([
    //         'is_user' => Authenticate::class,
    //         'guest_only' => RedirectIfAuthenticated::class, // Ensure this matches the class name
    //     ]);
    //     //
    // })

    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'guest_only' => Authenticate::class,
            'is_user' => RedirectIfAuthenticated::class,  // Prevents logged-in users from accessing login
        ]);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

    header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

    
