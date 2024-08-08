<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\TaskTitle;
use Illuminate\Http\Request;
use Laravel\Passport\HasApiTokens;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        return response()->json(['message' => 'Tasks created successfully'], 201);
    }
}