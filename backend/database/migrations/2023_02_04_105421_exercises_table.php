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
        Schema::create('exercises_table', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('main_img');
            $table->string('main_vid');
            $table->string("proper_form_img");
            $table->enum('body_part_target', ['','',''])->default("");
            $table->integer('duration');
            $table->integer('break_duration');
            $table->string('warm_up');
            $table->integer('iterations');
            $table->integer('sets');
            $table->enum('state', ['unstarted','started','progress','finished'])->default("unstarted");
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
        Schema::dropIfExists('exercises_table');
    }
};
