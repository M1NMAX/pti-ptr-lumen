<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccommodationInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accommodation_info', function (Blueprint $table) {
            $table->id('accommodation_id');
            $table->string('accommodationType');
            $table->integer('rooms');
            $table->integer('bathRooms');
            $table->integer('area');
            $table->char('solar',2);
            $table->boolean('wifi');
            $table->boolean('clean');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accommodation_info');
    }
}
