<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use App\Models\TaskTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'user_id' => $request -> user_id, // Or dynamically set based on authenticated user
        ]);

        foreach ($request->tasks as $task) {
            $taskTitle->tasks()->create([
                'description' => $task
            ]);
        }

        return response()->json([
            'task_title' => $taskTitle
        ], 200);
    }

    public function getUserTaskTitles(Request $request) {
        // Get the currently authenticated user
        $userId = $request -> user_id;

        // Fetch the latest task titles associated with the logged-in user
        $taskTitles = TaskTitle::where('user_id', $userId)
        ->orderBy('created_at', 'desc') // Sort by creation date in descending order
        ->get();

        return response()->json([
            'task_titles' => $taskTitles
        ], 200);
    }

    public function getUserTasks(Request $request) {
        $task_id = $request -> task_id;
        $tasks = Task::where('task_title_id', $task_id)-> get();
        return response()->json([
            'tasks' => $tasks
        ], 200);
    }

    public function getUserTaskTitle (Request $request) {
        $task_id = $request -> task_id;

        // Fetch task titles associated with the logged-in user
        $taskTitle = TaskTitle::where('id', $task_id)->first();

        return response()->json([
            'task_title' => $taskTitle
        ], 200);
    }

    public function test(Request $request) {
        // Get the currently authenticated user
        $userId = $request->user_id;

        // Fetch the latest task titles associated with the logged-in user, including tasks
        $taskTitles = TaskTitle::with('tasks') // Eager load related tasks
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc') // Sort by creation date in descending order
            ->get();

        return response()->json([
            'task_titles' => $taskTitles
        ], 200);
    }
}
