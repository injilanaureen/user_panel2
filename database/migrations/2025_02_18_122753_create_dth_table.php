<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dth', function (Blueprint $table) {
            $table->id();
            $table->string('operator');
            $table->string('canumber');
            $table->decimal('amount', 8, 2);
            $table->string('referenceid')->nullable();
            $table->string('message');
            $table->boolean('status');
            $table->timestamp('recharge_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dth');
    }
};
