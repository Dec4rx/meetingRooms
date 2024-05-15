<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Data validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['message', $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Create the token
        $token = $user->createToken('LaravelAuth')->accessToken;
        // Send the user data
        return response()->json([
            'token' => $token,
            'user' => $user->id
        ], 201);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            $responseArray = [];
            $responseArray['token'] = $user->createToken('LaravelAuth')->accessToken;
            $responseArray['user'] =  $user->id;
            return response()->json($responseArray, 200);
        } else {
            return response()->json(['message' => 'Please check your email and password'], 401);
        }
    }
}
