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
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("profile")->default("https://res.cloudinary.com/dtveiunmn/image/upload/v1677458808/profile_w8hn3z.png");
            $table->rememberToken();
            $table->string('bio')->default('there is no autobiography !');
            $table->float('weight', places: 1)->default(70.0);
            $table->float('height', places: 2)->default(1,75);
            $table->float('body_fat', places: 1)->default(20);
            $table->float('BMI')->default(22);
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->date('birth_date')->default("2000-01-01");
            $table->enum('workout_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->enum('top_goal', ['maintaining', 'bulking', 'cutting'])->default('maintaining');
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
