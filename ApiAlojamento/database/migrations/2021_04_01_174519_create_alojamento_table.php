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
            $table->integer('coordenadas');    
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

    public function caracteristicas()
    {
        return $this->belongsToMany(Caracteristica::class);
    }
}
