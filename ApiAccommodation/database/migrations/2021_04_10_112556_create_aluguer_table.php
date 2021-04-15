<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAluguerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aluguer', function (Blueprint $table) {
            $table->id();
            $table->integer('alojamento_id');
            $table->integer('user_id');
            $table->integer('preco');
            $table->date('dataInicio');
            $table->date('dataFim');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aluguer');
    }
}
