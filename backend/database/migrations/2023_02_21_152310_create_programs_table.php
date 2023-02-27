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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('owner_id', unsigned: true)->nullable();
            $table->foreign('owner_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string("main_img")->default("https://bit.ly/34BY10g");
            $table->string("title");
            $table->string("description");
            $table->enum('state', ['progress', 'unstarted', 'finished'])->default("unstarted");
            $table->enum('category', ['maintaining', 'bulking', 'cutting'])->default("maintaining");
            $table->enum('difficulty_level', ['low', 'moderate', 'high', 'extreme']);
            $table->boolean("isFree")->default(true);
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
        Schema::dropIfExists('programs');
    }
};
