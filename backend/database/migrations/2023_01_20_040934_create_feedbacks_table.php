<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->bigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->text('message');
            $table->enum('f1', ['1', '2', '3','4'])->default("1");
            $table->enum('f2', ['1', '2', '3','4'])->default("1");
            $table->enum('f3', ['1', '2', '3','4'])->default("1");
            $table->enum('f4', ['1', '2', '3','4'])->default("1");
            $table->enum('f5', ['1', '2', '3','4'])->default("1");
            $table->enum('f6', ['1', '2', '3','4'])->default("1");
            $table->enum('f7', ['1', '2', '3','4'])->default("1");
            $table->enum('f8', ['1', '2', '3','4'])->default("1");
            $table->enum('f9', ['1', '2', '3','4'])->default("1");
            $table->enum('f10', ['1', '2', '3','4'])->default("1");
            $table->enum('f11', ['1', '2', '3','4'])->default("1");
            $table->enum('f12', ['1', '2', '3','4'])->default("1");
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
        Schema::dropIfExists('feedbacks');
    }
};
