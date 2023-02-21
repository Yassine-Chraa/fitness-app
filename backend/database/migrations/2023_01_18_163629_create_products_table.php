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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->enum("category",["gym_cloths","gym_nutrition"]);
            $table->string("description");
            $table->enum("size",['S','M','L','XL'])->nullable();
            $table->string("color")->nullable();
            $table->string("company")->nullable();
            $table->string("rating");
            $table->integer("reviews");
            $table->integer("stock");
            $table->double("price");
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
        Schema::dropIfExists('products');
    }
};
