<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Resource extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function equipment()
    {
        return $this->belongsTo(Equipments::class);
    }
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
