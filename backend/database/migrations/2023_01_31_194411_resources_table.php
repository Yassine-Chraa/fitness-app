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
        Schema::create('resources_table', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('meal_item_id')->nullable();
            $table->foreignId('meal_id')->nullable();
            $table->foreignId('activity_id')->nullable();
            $table->foreignId('product_id')->nullable();
            $table->foreignId('equipment_id')->nullable();
            $table->string('url');
            $table->enum('type', ['image', 'video'])->default('image');
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
        Schema::dropIfExists('resources_table');
    }
};
