<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class DailyNutrition extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'user_id',
        'date',
        'energy_consumed',
        'protein_consumed',
        'fat_consumed',
        'fiber_consumed',
        'carbohydrate_consumed',
        'energy_expended'
    ];

    public function historyItems()
    {
        return $this->hasMany(NutritionItem::class,'daily_nutrition_id');
    }
    public $timestamps = false;
}
