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
            $table->enum('role', ['admin', 'user', 'client', 'vip', 'coach'])->default('user');
            $table->string('name');
            $table->float('weight')->default(70);
            $table->float('height')->default(1,75);
            $table->float('body_fat')->default(0);
            $table->float('BMI')->default(22);
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->integer('birth_date')->nullable();
            $table->enum('workout_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->enum('top_goal', ['maintaining', 'bulking', 'cutting'])->default('maintaining');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("bio")->nullable();
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
