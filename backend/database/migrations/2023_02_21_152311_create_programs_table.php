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
            $table->string("main_img")->default("https://res.cloudinary.com/dtveiunmn/image/upload/v1681261019/default_ma6o6z.jpg");
            $table->string("title");
            $table->text("description")->nullable();
            $table->enum('category', ['maintaining', 'bulking', 'cutting'])->default("maintaining");
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
            $table->boolean("isFree")->default(true);
            $table->string("days")->default(3);
            $table->boolean("isPublic")->default(1);
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
