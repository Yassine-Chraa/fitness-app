<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserProgram extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'program_id',
        'user_id',
        'isUsed',
    ];

    public function details()
    {
        return $this->belongsTo(Program::class,'program_id');
    }
}
