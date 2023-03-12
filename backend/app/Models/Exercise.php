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
        "description",
        "api_id",
        "rest",
        "reps",
        "sets",
        "state",
        "category",
    ];

    public function workout_exercise():HasMany
    {
        return $this->hasMany(WorkOutExercise::class, "workout_id");
    }

    public function workouts():BelongsTo
    {
        return $this->belongsTo(WorkOut::class);
    }
    public function equipments():HasMany
    {
        return $this->hasMany(Equipments::class, "exercise_id");
    }
}
