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
            $table->string("main_img");
            $table->string("main_vid");
            $table->string("title");
            $table->string("description");
            $table->dateTime("start_time");
            $table->dateTime("end_time");
            $table->integer("duration");
            $table->integer("break_duration");
            $table->enum('state', ['progress','unfinished','finished'])->default("unfinished");
            $table->enum('category', ['maintaining','bulking','cutting'])->default("maintaining");
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
