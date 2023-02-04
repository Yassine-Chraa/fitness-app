<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class MealItem extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'img_url',
        'description',
        // 'weight',
        // 'isVegan',
    ];

    public function images()
    {
        return $this->hasMany(Resource::class,"meal_item_id");
    }
}
