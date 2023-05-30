<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Exercise extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        "title",
        "img",
        "description",
        "api_id",
        "category",
        "subcategory"
    ];
}
