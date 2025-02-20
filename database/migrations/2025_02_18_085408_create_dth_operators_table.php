<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('dth_operators', function (Blueprint $table) {
            $table->id();
            $table->string('operator_id'); // operator ID
            $table->string('operator_name'); // operator Name
            $table->string('category'); // Category (DTH)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dth_operators');
    }
};
