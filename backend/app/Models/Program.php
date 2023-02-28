<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Program extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        "main_img",
        "title",
        "description",
        'category',
        "isFree",
        "difficulty_level",
        "owner_id",
    ];

    public function images()
    {
        return $this->hasMany(Resource::class,"program_id");
    }
    public function workouts()
    {
        return $this->hasMany(WorkOut::class,"program_id");
    }
}
