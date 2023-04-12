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
            $table->bigInteger("workout_id",unsigned:true);
            $table->bigInteger("exercise_id",unsigned:true);
            $table->foreign('workout_id')->references('id')->on('workouts')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('exercise_id')->references('id')->on('exercises')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('rest')->default(60);
            $table->integer('reps')->default(3);
            $table->integer('sets')->default(8);
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
