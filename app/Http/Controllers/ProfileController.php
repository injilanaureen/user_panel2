<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    // Show Profile
    public function show()
    {
        return Inertia::render('Profile/Profile', [
            'user' => Auth::user()
        ]);
    }

    // Edit Profile
    public function edit()
    {
        return Inertia::render('Profile/Edit', [
            'user' => Auth::user()
        ]);
    }

    // Update Profile
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
        ]);

        $user = Auth::user();
        $user->update($request->only(['name', 'email']));

        return redirect()->route('profile.show')->with('success', 'Profile updated successfully');
    }

    // Edit Password
    public function editPassword()
    {
        return Inertia::render('Profile/ChangePassword');
    }

    // Update Password
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect']);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect()->route('profile.show')->with('success', 'Password updated successfully');
    }
    public function settings()
    {
        return Inertia::render('Profile/Settings');
    }
    
}
