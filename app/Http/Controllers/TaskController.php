<?php

namespace App\Http\Controllers;

use DateTime;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\TaskTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use League\CommonMark\Extension\TaskList\TaskListItemMarker;

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
        $userId = $request->user_id;

        // Fetch the latest task titles associated with the logged-in user, including tasks
        $taskTitles = TaskTitle::with('tasks') // Eager load related tasks
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc') // Sort by creation date in descending order
            ->get();

        $total_task = 0;

        foreach ($taskTitles as $taskTitle) {
            $total_task += $taskTitle->tasks->count();
        }

        $temp_titles = [];

        foreach($taskTitles as $taskTitle) {

            switch ($taskTitle->category) {
                case 'health':
                    $taskTitle->category = 'faHeart';
                    break;
                case 'grocery':
                    $taskTitle->category = 'faLemon';
                    break;
                case 'exercise':
                    $taskTitle->category = 'faFaceGrinBeamSweat';
                    break;
                case 'school':
                    $taskTitle->category = 'faPenToSquare';
                    break;
                default:
                    $taskTitle->category = 'faClone';
                    break;
            }

            $date = new DateTime($taskTitle->date);
            $formattedDate = $date->format('F d, Y'); // Formats to "August 09, 2024"

            if (!array_key_exists($formattedDate, $temp_titles)) {
                $temp_titles[$formattedDate] = []; // Push $formattedDate with an empty array
            }
        }

        foreach($taskTitles as $taskTitle) {
            $date = new DateTime($taskTitle -> date);
            $formattedDate = $date->format('F d, Y');

            forEach($temp_titles as $date => $temp_title) {
                if($date === $formattedDate) {
                    array_push($temp_titles[$date], $taskTitle);
                }
            }
        }

        foreach ($temp_titles as $date => $taskTitles) {
            foreach ($taskTitles as &$taskTitle) {

                $temp = [
                    'done' => 0,
                    'total' => count($taskTitle->tasks), // Assuming tasks is an array
                    'is_complete' => false,
                ];

                foreach($taskTitle -> tasks as $individual) {
                    if($individual['is_done'] != 0) {
                        $temp['done'] += 1;
                    }
                }

                $temp['is_complete'] = $temp['done'] ===  $temp['total'] ? true : false;

                $taskTitle['status'] = $temp;
            }

            // If you need to reset the reference after use
            unset($taskTitle); // Optional, to avoid accidental references
        }

        return response()->json([
            'task_titles' => $temp_titles,
            'total_task' => $total_task
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

    public function deleteEntireTask(Request $request) {
        $task_id = $request -> task_id;
        $user_id = $request -> user_id;

        // Retrieve the task titles along with their related tasks
        $taskTitles = TaskTitle::with('tasks')
        ->where('user_id', $user_id)
        ->where('id', $task_id)
        ->get();

        // Check if records are found
        if ($taskTitles->isEmpty()) {
        return response()->json(['message' => 'No records found.'], 404);
        }

        // Delete related tasks first
        foreach ($taskTitles as $taskTitle) {
        Task::where('task_title_id', $taskTitle->id)->delete();
        }

        // Delete the task titles
        TaskTitle::where('user_id', $user_id)
        ->where('id', $task_id)
        ->delete();

        return response()->json(['message' => 'Task deleted successfully.'], 200);
    }

    public function updateTask(Request $request) {
        $task_id = $request -> task_id;
        $user_id = $request -> user_id;

        // Retrieve the task titles along with their related tasks
        $taskTitle = TaskTitle::where('user_id', $user_id)
        ->where('id', $task_id)
        ->first();

        // if ($taskTitle) {
        //     $taskTitle->task_title = $request->input('task_title');
        //     $taskTitle->save();
        // }

        // return response()->json([
        //     'message' => 'Task title updated successfully',
        //     'taskTitle' => $taskTitle
        // ], 200);

        return $request;
    }


    public function updateTaskStatus(Request $request) {
        $task_id = $request -> task_id;

        $task = Task::where('id', $task_id)
        ->first();

         if ($task) {
            $task->is_done = $task -> is_done ? 0 : 1;
            $task->save();
        }

        return $task;
    }
}