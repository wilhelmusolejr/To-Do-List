<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['task_title_id', 'description', 'is_done'];

    public function taskTitle()
    {
        return $this->belongsTo(TaskTitle::class);
    }
}