<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMensagemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mensagem', function (Blueprint $table) {
            $table->id();
            $table->integer('chat_id');
            $table->integer('user_id');
            $table->string('content');
            $table->dateTime('created_at');
        });
    }

    public $timestamps = false;
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mensagem');
    }
}
