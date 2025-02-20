<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UpdateUserPasswordsSeeder extends Seeder
{
    public function run()
    {
        // Example: Update the password for the first user (ID=1)
        $user = User::find(1);  // Find the user by their ID or any other criteria

        if ($user) {
            $user->password = Hash::make('newpassword'); // Update with a new known password
            $user->save(); // Save the updated user
        }

        // You can repeat the above for other users if needed.
    }
}
