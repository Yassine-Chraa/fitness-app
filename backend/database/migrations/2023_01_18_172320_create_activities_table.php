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
        Schema::create('activities_table', function (Blueprint $table) {
            $table->id();
            $table->string('name');
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
            $table->string('description');
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
        Schema::dropIfExists('activities_table');
    }
};
