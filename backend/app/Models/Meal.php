<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Meal extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'category',
        'description',
        'weight',
        'isVegan',
        'isVegetable'
    ];

    public function images()
    {
        return $this->hasMany(Resource::class,"meal_id");
    }
    public function mealItems()
    {
        return $this->hasMany(MealItem::class,"meal_id");
    }
}
