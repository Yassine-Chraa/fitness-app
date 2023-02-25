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
        "state",
        "title",
        "description",
        "start_time",
        "end_time",
        "duration",
        "break_duration",
        'category',
        "isFree",
    ];

    public function images()
    {
        return $this->hasMany(Resource::class,"program_id");
    }
}
