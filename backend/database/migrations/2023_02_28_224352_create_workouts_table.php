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
        Schema::create('workouts', function (Blueprint $table) {
            $table->id();
<<<<<<<< HEAD:backend/database/migrations/2023_02_27_001045_create_workouts_table.php
            $table->bigInteger('program_id', unsigned: true)->nullable();
            $table->foreign('program_id')->references('id')->on('programs')->onUpdate('cascade')->onDelete('cascade');
========
            $table->foreignId("program_id");
>>>>>>>> e89a14537e1f96448af68206bf33153934f90012:backend/database/migrations/2023_02_28_224352_create_workouts_table.php
            $table->string('title');
            $table->integer('duration');
            $table->enum('day', ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
            $table->enum('state', ['progress', 'unstarted', 'finished'])->default("unstarted");
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
        Schema::dropIfExists('workouts');
    }
};
