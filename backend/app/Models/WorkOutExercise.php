<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class WorkOutExercise extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'workout_id',
        'exercise_id',
    ];

    protected $table = 'workout_exercise';

    public function workout(): BelongsTo
    {
        return $this->belongsTo(workout::class);
    }
    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
