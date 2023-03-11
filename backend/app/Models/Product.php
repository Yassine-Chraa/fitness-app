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
        'product_img',
        'category_id',
        'description',
        'company',
        'rating',
        'reviews',
        'stock',
        'price',
    ];

    public function items()
    {
        return $this->hasMany(ProductItem::class);
    }
    public function category()
    {
        return $this->belongsTo(Categorie::class);
    }
}
