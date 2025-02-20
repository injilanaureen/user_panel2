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
        Schema::create('recharge_status_enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('txnid');
            $table->string('operatorid');
            $table->string('operatorname');
            $table->string('canumber');
            $table->decimal('amount', 8, 2);
            $table->string('refid');
            $table->tinyInteger('status');
            $table->decimal('comm', 8, 2);
            $table->decimal('tds', 8, 2);
            $table->boolean('refunded');
            $table->string('refundtxnid')->nullable();
            $table->timestamp('dateadded');
            $table->timestamp('daterefunded')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recharge_status_enquiries');
    }
};
