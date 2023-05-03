<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile',
        'birth_date',
        'BMI',
        'body_fat',
        'height',
        'gender',
        'top_goal',
        'weight',
        'workout_level',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function programs()
    {
        return $this->hasMany(UserProgram::class);
    }
    public function dailyNutritions()
    {
        return $this->hasMany(DailyNutrition::class);
    }
    public function cart()
    {
        return $this->hasMany(CartItem::class);
    }
    public function ratings()
    {
        return $this->hasMany(ProductRating::class);
    }
    public function weights()
    {
        return $this->hasMany(UserWeight::class);
    }
}
