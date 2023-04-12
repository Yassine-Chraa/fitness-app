<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Workout extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'program_id',
        'title',
        'duration',
        'day',
        'state',
    ];


    public function exercises()
    {
        return $this->hasMany(WorkoutExercise::class);
    }
}
