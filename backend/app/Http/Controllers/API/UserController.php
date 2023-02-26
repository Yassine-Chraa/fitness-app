<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * GET: api/users
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * POST: api/users
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $newUser = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'birth_date' => $request->get('birth_date'),
            'BMI' => $request->get('BMI'),
            'body_fat' => $request->get('body_fat'),
            'height' => $request->get('height'),
            'gender' => $request->get('gender'),
            'top_goal' => $request->get('top_goal'),
            'weight' => $request->get('weight'),
            'workout_level' => $request->get('workout_level'),
            'bio' => $request->get('bio'),
        ]);


        $newUser->age  = Carbon::parse($request->get('birth_date'))->age;

        $newUser->save();

        // $token = $newUser->createToken("api_token")->plainTextToken;

        return response()->json(['message' => 'User Was Added successfully !']);
    }

    /**
     * GET: api/users/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * PUT/PATCH: api/users/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $user = User::findOrFail($id);
        if ($request->get('type') == "emailForm") {
            $request->validate([
                'name' => 'required|min:4',
                'email' => 'required|email',
            ]);

            $user->name = $request->get('name');
            $user->email = $request->get('email');

            $user->save();
            return response()->json(['message' => 'User updated']);
        } elseif ($request->get('type') == "passwordForm") {
            $request->validate([
                'password' => 'required|min:6',
                'nvPassword' => 'required|min:6',
            ]);

            if (Hash::check($request->get('password'), $user->password)) {

                $user->password =  Hash::make($request->get('nvPassword'));
                $user->save();

                return response()->json(['message' => 'User updated']);
            } else {
                return response(["error" => "Password is incorrect"], 422);
            }
        } else {
            if ($request->get('name')) {
                $user->name = $request->get('name');
            }
            if ($request->get('email')) {
                $user->email = $request->get('email');
            }
            if ($request->get('role')) {
                $user->role = $request->get('role');
            }
            if ($request->get('BMI')) {
                $user->role = $request->get('BMI');
            }
            if ($request->get('body_fat')) {
                $user->role = $request->get('body_fat');
            }
            if ($request->get('weight')) {
                $user->weight = $request->get('weight');
            }
            if ($request->get('height')) {
                $user->height = $request->get('height');
                $user->age  = Carbon::parse($request->get('birth_date'))->age;
            }
            if ($request->get('birth_date')) {
                $user->birth_date = $request->get('birth_date');
            }
            if ($request->get('gender')) {
                $user->gender = $request->get('gender');
            }
            if ($request->get('workout_level')) {
                $user->workout_level = $request->get('workout_level');
            }
            if ($request->get('top_goal')) {
                $user->top_goal = $request->get('top_goal');
            }
            if ($request->get('bio')) {
                $user->top_goal = $request->get('bio');
            }

            $user->save();

            return response()->json(['message' => "user updated successfully !"]);
        }
    }

    /**
     * DELETE: api/users/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
