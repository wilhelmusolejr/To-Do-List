<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskTitle extends Model
{
    use HasFactory;

    protected $fillable = ['category', 'task_title', 'date', 'user_id'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}