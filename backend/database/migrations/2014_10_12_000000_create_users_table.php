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
            $table->string('img_url')->default("https://bit.ly/34BY10g");
            $table->enum('role', ['admin', 'user', 'client', 'vip', 'coach'])->default('user');
            $table->string('name');
            $table->float('weight',places:1)->default(70);
            $table->float('height',places:2)->default(1,75);
            $table->float('body_fat',places:1)->default(20);
            $table->float('BMI')->default(22);
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->date('birth_date')->default("2000-02-02");
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
