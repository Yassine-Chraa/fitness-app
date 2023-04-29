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
        Schema::create('workout_exercises', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('workout_id', unsigned: true)->nullable();
            $table->foreign('workout_id')->references('id')->on('workouts')->onUpdate('cascade')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('api_id');
            $table->integer('rest');
            $table->integer('reps');
            $table->integer('sets');
            $table->enum('state', ['unstarted','progress','finished'])->default("unstarted");
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
        Schema::dropIfExists('workout_exercises');
    }
};