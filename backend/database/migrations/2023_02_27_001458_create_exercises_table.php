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
            $table->string('title');
            $table->string('img')->default('https://res.cloudinary.com/dtveiunmn/image/upload/v1681261019/default_ma6o6z.jpg');
            $table->text('description');
            $table->string('api_id')->nullable();
            $table->enum('category',["Triceps","Chest","Shoulder","Biceps","Core","Back","Forearms","Upper Legs","Glutes","Calves","Cardio"]);
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
