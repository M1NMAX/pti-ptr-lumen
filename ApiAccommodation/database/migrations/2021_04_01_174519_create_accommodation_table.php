<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccommodationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accommodation', function (Blueprint $table) {
            $table->id();
            $table->integer('landlord_id'); 
            $table->string('name');
            $table->string('description');
            $table->float('rating');
            $table->integer('nRates');
            $table->integer('price');
            $table->string('streetName');
            $table->string('city');
            $table->string('country');
            $table->integer('latitude');  
            $table->integer('longitude');    
            $table->timestamps();       
        });
    } 

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accommodation');
    }
}
