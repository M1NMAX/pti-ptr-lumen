<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRentalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rental', function (Blueprint $table)
        {
            $table->id();
            $table->integer('accommodation_id');
            $table->integer('guest_id');
            $table->integer('landlord_id');
            $table->integer('price');
            $table->string('beginDate');
            $table->string('endDate');
            $table->boolean('paymentState');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rental');
    }
}
