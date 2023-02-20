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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->enum('role', ['admin', 'user', 'client', 'vip', 'coach'])->default('client');
            $table->string('name');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->float('weight')->default(0);
            $table->float('height')->default(0);
            $table->enum('gender', ['male', 'female', 'unknown'])->default('unknown');
            $table->date('birth_date')->nullable();
            $table->integer('age')->nullable();
            $table->string('img_url')->default('empty_profile_picture.png');
            $table->integer('score')->default(0);
            $table->enum('work_out_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->enum('top_goal', ['maintaining', 'bulking', 'cutting'])->default('maintaining');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("bio")->nullable(true);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
