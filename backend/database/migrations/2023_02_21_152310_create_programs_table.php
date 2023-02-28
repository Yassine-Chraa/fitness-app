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
            $table->foreign('owner_id')->nullable();
            $table->string("main_img")->default("https://bit.ly/34BY10g");
            $table->string("title");
            $table->string("description");
            $table->enum('category', ['maintaining', 'bulking', 'cutting'])->default("maintaining");
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
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
