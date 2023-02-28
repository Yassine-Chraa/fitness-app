<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Exercise extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        "workout_id",
        "title",
        "description",
        "api_id",
        "rest",
        "reps",
        "sets",
        "state",
    ];


    public function activity()
    {
        return $this->belongsTo(WorkOut::class);
    }
}
