<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $newUser = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            // 'profile' => $request->get('profile')
        ]);
        $newUser->save();
        $token = $newUser->createToken("api_token")->plainTextToken;
        return response()->json(['MyTokon' => $token]);
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
            $user->role = $request->get('role');
            $user->country = $request->get('country');
            $user->city = $request->get('city');
            $user->weight = $request->get('weight');
            $user->height = $request->get('height');
            $user->gender = $request->get('gender');
            $user->birth_date = $request->get('birth_date');
            $user->age = $request->get('age');
            $user->img_url = $request->get('img_url');
            $user->score = $request->get('score');
            $user->work_out_level = $request->get('work_out_level');
            $user->top_goal = $request->get('top_goal');
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
