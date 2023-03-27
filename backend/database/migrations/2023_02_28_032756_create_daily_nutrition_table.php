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
        Schema::create('daily_nutrition', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id', unsigned: true)->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->float('energy_consumed', places: 1)->default(0);
            $table->float('protein_consumed', places: 2)->default(0);
            $table->float('fat_consumed', places: 2)->default(0);
            $table->float('fiber_consumed', places: 2)->default(0);
            $table->float('carbohydrate_consumed', places: 2)->default(0);
            $table->date('date');

            $table->unique(['user_id','date'],'unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daily_nutrition');
    }
};
