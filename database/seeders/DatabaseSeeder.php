<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Call the UsersTableSeeder to insert users into the database
        $this->call(UsersTableSeeder::class);
    }
}
