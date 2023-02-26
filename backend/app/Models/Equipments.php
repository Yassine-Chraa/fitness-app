<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Equipments extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'category',
        'description',
        'image',
    ];


    public function images()
    {
        return $this->hasMany(Resource::class,"equipment_id");
    }
    public function exercises()
    {
        return $this->hasMany(Exercise::class,"exercise_id");
    }
}
