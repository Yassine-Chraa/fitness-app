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
        Schema::create('workouts_table', function (Blueprint $table) {
            $table->id();
            $table->foreign("program_id")->nullable();
            $table->string('title');
            $table->string('description');
            $table->enum(
                'category',
                [
                    'Core',
                    'Chest',
                    'Shoulder',
                    'Biceps',
                    'Triceps', 'Back',
                    'Forearms',
                    'Upper legs',
                    'Glutes',
                    'Cardio',
                    'Calves'
                ]
            )->default('Cardio');
            $table->enum('difficulty_level',['low','moderate','high','extreme']);
            $table->integer('duration');
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
        Schema::dropIfExists('workouts_table');
    }
};
