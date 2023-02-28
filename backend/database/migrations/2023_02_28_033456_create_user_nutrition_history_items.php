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
        Schema::create('user_nutrition_history_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('history_id', unsigned: true)->nullable();
            $table->foreign('history_id')->references('id')->on('user_nutrition_histories')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name')->default('undefined');
            $table->float('poid', places: 1)->default(0);
            $table->float('energy', places: 1)->default(0);
            $table->float('protein', places: 2)->default(0);
            $table->float('fat', places: 2)->default(0);
            $table->float('fiber', places: 2)->default(0);
            $table->float('Carbohydrate', places: 2)->default(0);
            $table->time('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_nutrition_history_items');
    }
};
