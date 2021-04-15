<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlojamentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alojamento', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('descricao');
            $table->float('rating');
            $table->integer('nRates');
            $table->integer('preco');
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
        Schema::dropIfExists('alojamento');
    }


}
