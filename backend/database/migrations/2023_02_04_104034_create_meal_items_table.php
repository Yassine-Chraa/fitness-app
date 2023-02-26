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
        Schema::create('meal_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->nullable();
            $table->string('name');
            $table->string('img_url');
            $table->float('carbohydrates');
            $table->float('fats');
            $table->float('proteins');
            $table->float('miniral_salts');
            $table->float('vitamins');
            $table->float('water');
            $table->float('fiber');
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
        Schema::dropIfExists('meal_items');
    }
};
