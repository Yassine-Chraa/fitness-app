<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NutritionItem extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'daily_nutrition_id',
        'name',
        'food_id',
        'category',
        'poid',
        'energy',
        'protein',
        'fat',
        'fiber',
        'Carbohydrate',
        'time'
    ];
}
