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
        Schema::create('nutrition_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('daily_nutrition_id', unsigned: true)->nullable();
            $table->foreign('daily_nutrition_id')->references('id')->on('daily_nutrition')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name')->default('undefined');
            $table->string('food_id');
            $table->string('category');
            $table->float('poid', places: 1)->default(0);
            $table->float('energy', places: 1)->default(0);
            $table->float('protein', places: 2)->default(0);
            $table->float('fat', places: 2)->default(0);
            $table->float('fiber', places: 2)->default(0);
            $table->float('Carbohydrate', places: 2)->default(0);
            $table->time('time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nutrition_items');
    }
};
