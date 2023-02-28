<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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


    public function images()
    {
        return $this->hasMany(Resource::class, "activity_id");
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class, "activity_id");
    }
}
