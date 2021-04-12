<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAluguerPendingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aluguer_pending', function (Blueprint $table) {
            $table->id();
            $table->integer('senhorio_id');
            $table->integer('alojamento_id');
            $table->integer('user_id');
            $table->integer('preco');
            $table->date('dataInicio');
            $table->date('dataFim');
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
        Schema::dropIfExists('aluguer_pending');
    }
}
