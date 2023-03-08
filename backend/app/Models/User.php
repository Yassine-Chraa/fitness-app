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
        'profile',
        'role',
        'password',
        'weight',
        'height',
        'BMI',
        'body_fat',
        'gender',
        'birth_date',
        'workout_level',
        'top_goal',
        'bio'
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
        return $this->hasMany(Program::class,"owner_id");
    }
    public function nutritionHistory()
    {
        return $this->hasOne(UserNutritionHistory::class);
    }
    public function cart()
    {
        return $this->hasMany(CartItem::class);
    }
}
