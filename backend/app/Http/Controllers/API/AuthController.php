<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * sign-up a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function signUp(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' =>  Hash::make($request->get('password')),
        ]);

        $token = $user->createToken('api_Token')->plainTextToken;

        $result = [
            'user' => $user,
            'token' => $token
        ];
        return response()->json($result, 201);
    }

    /**
     * login with password and username(email).
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function signIn(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'Message' => 'incorrect username or password'
            ], 401);
        }

        $token = $user->createToken('api_Token')->plainTextToken;

        $result = [
            'user' => $user,
            'token' => $token
        ];

        return response()->json($result, 201);
    }


    /**
     * logout.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function logOut()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json(['message' => 'user logged out']);
    }

    /**
     * delete account.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteAccount()
    {
        $user = Auth::user();

        $user->tokens->each(function ($token, $key) {
            $token->delete();
        });

        $user = User::findOrFail($user->id);

        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
