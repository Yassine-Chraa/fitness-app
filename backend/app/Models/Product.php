<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Product extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'category',
        'description',
        'size',
        'color',
        'company',
        'rating',
        'reviews',
        'stock',
        'price',
    ];

    public function images()
    {
        return $this->hasMany(Resource::class,"product_id");
    }
}
