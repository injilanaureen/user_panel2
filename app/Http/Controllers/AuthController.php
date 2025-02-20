<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');  // Display the login form
    }
    public function login(Request $request)
    {
        // Validate input
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
    
            // Ensure timestamps are updated
            $user->forceFill([
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ])->save();
    
            return redirect()->route('dashboard');
        }
    
        return back()->withErrors(['email' => 'Invalid credentials']);
    }
    
    

    public function logout()
    {
        Auth::logout();
        return redirect('/');  // Redirect to the welcome page
    }
}
