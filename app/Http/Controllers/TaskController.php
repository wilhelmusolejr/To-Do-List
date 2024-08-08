<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\TaskTitle;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'task_title' => 'required|string|max:255',
            'tasks' => 'required|array',
        ]);

        $taskTitle = TaskTitle::create([
            'category' => $request->category,
            'task_title' => $request -> task_title,
             'date' => Carbon::now(),
            'user_id' => 1, // Or dynamically set based on authenticated user
        ]);

        foreach ($request->tasks as $task) {
            $taskTitle->tasks()->create([
                'description' => $task
            ]);
        }

        return response()->json(['message' => 'Tasks created successfully'], 201);
    }
}