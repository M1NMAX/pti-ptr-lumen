<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccommodationRequirementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accommodation_requirements', function (Blueprint $table) {
            $table->id();
            $table->integer('accommodation_id');
            $table->integer('ageRangeBot');
            $table->integer('ageRangeTop');
            $table->string('gender');
            $table->boolean('smoker');
            $table->boolean('pets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accommodation_requirements');
    }
}
