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
            $table->string('name', 50);
            $table->string('description');
            $table->float('rating');
            $table->integer('nRates');
            $table->integer('price');
            $table->string('address', 120);
            $table->string('district');
            $table->string('county');
            $table->integer('latitude');  
            $table->integer('longitude');    
            $table->boolean('available');  
            $table->string('profileImage');
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
