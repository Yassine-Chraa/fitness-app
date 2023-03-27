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
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('category');
            $table->dropColumn("rating");
            $table->dropColumn("reviews");
            $table->bigInteger('category_id', unsigned: true)->nullable()->after('name');
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('products', function (Blueprint $table) {
            $table->enum("category", ["gym_cloths", "gym_nutrition"]);
            $table->dropForeign('category_id');
        });*/
    }
};
