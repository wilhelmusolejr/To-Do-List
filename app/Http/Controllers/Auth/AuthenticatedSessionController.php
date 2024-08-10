<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function login(Request $request) {
        // Step 1: Validate the request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        // Step 2: Attempt to authenticate
        if (Auth::attempt($credentials)) {
            // Authentication passed, log in the user
            $user = Auth::user();
            $token = true;
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request) {
        return $request;
    }
}
