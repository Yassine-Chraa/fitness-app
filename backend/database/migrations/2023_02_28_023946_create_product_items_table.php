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
        Schema::create('product_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id', unsigned: true)->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onUpdate('cascade')->onDelete('cascade');
            $table->enum("color", ['black', 'blue', 'green', 'white'])->default('black');
            $table->enum("size", ['S', 'M', 'L', 'XL'])->default('M');
            $table->string('item_img')->default('https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png');
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
        Schema::dropIfExists('product_items');
    }
};
