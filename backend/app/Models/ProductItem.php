<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ProductItem extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'color',
        'size',
        'item_img',
    ];

}
