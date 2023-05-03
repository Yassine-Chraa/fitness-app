<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class WorkoutExercise extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'workout_id',
        'exercise_id',
        'rest',
        'reps',
        'sets'
    ];

    public function details()
    {
        return $this->belongsTo(Exercise::class,'exercise_id');
    }
}
