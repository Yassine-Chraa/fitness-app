<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Expr\Cast\Array_;

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
        $BMI =  $request->get('weight') / ($request->get('height') * $request->get('height'));
        $newUser = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'profile' => $request->get('profile'),
            'birth_date' => $request->get('birth_date'),
            'BMI' => $BMI,
            'body_fat' => $request->get('body_fat') || 20.0,
            'height' => $request->get('height'),
            'gender' => $request->get('gender'),
            'top_goal' => $request->get('top_goal'),
            'weight' => $request->get('weight'),
            'workout_level' => $request->get('workout_level'),
            'bio' => $request->get('bio'),
        ]);

        $newUser->save();

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
        $user->programs = $user->programs;
        if ($user->nutritionHistory) $user->history_items = $user->nutritionHistory->historyItems;
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
        if ($request->get('type') == "passwordForm") {
            $request->validate([
                'password' => 'required|min:8',
                'nvPassword' => 'required|min:8',
            ]);

            if (Hash::check($request->get('password'), $user->password)) {

                $user->password =  Hash::make($request->get('nvPassword'));
                $user->save();

                return response()->json(['message' => 'User updated']);
            } else {
                return response(["error" => "Password is incorrect"], 422);
            }
        } else {
            $request->validate([
                'name' => 'required|min:4',
                'email' => 'required|email',
            ]);
            $BMI =  $request->get('weight') / ($request->get('height') * $request->get('height'));
            $user->name = $request->get('name');
            $user->email = $request->get('email');
            $user->profile = $request->get('profile');
            $user->role = $request->get('role');
            $user->BMI = $BMI;
            $user->body_fat = $request->get('body_fat');
            $user->weight = $request->get('weight');
            $user->height = $request->get('height');
            $user->birth_date = $request->get('birth_date');
            $user->gender = $request->get('gender');
            $user->workout_level = $request->get('workout_level');
            $user->top_goal = $request->get('top_goal');
            $user->bio = $request->get('bio');

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

    /**
     * Get total users: api/users/total
     *
     * @return \Illuminate\Http\Response
     */
    public function getTotal()
    {
        $count = count((array)User::all());
        return response()->json(['total' => $count]);
    }
    /**
     * Get User Cart Product: api/users/cart{id}
     *
     * @return \Illuminate\Http\Response
     */
    public function getCart($id)
    {
        $cart = User::find($id)->cart;
        foreach ($cart as $i => $item){
            $cart[$i]->product = Product::find($item->product_id);
        }

        return response()->json($cart);
    }
}
