<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'img_url',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
