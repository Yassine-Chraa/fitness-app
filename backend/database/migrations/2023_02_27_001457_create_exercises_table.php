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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('workout_id')->nullable();
            $table->foreign('workout_id')->references('id')->on('workouts')->onUpdate('NO ACTION')->onDelete('NO ACTION');
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
        Schema::dropIfExists('exercises');
    }
};
