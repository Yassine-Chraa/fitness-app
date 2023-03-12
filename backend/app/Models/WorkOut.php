<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class WorkOut extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'program_id',
        'title',
        'duration',
        'day',
        'state',
    ];

    protected $table = 'workouts';


    public function workout_exercise():HasMany
    {
        return $this->hasMany(WorkOutExercise::class, "workout_id");
    }

    public function images():HasMany
    {
        return $this->hasMany(Resource::class, "workout_id");
    }

    public function exercises():HasMany
    {
        return $this->hasMany(Exercise::class, "workout_id");
    }

    public function programs(): BelongsTo
    {
        return $this->belongsTo(Program::class, "program_id");
    }
}
