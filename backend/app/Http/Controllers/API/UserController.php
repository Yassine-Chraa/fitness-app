<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\DailyNutrition;
use App\Models\NutritionItem;
use App\Models\Product;
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
        foreach ($user->dailyNutritions as $i => $dailyNutrition) {
            $user->dailyNutritions[$i]->history_items = $dailyNutrition->historyItems;
        }
        $user->ratings = $user->ratings;
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
        foreach ($cart as $i => $item) {
            $cart[$i]->product = Product::find($item->product_id);
        }

        return response()->json($cart);
    }
    /**
     * Add Product to User Cart: api/users/cart
     *
     * @return \Illuminate\Http\Response
     */
    public function addProduct(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'product_id' => 'required',
        ]);

        $newItem = new CartItem([
            'user_id' => $request->get('user_id'),
            'product_id' => $request->get('product_id'),
        ]);

        $newItem->save();
        $newItem->product = Product::find($newItem->product_id);
        return response()->json($newItem);
    }

    /**
     * Delete Product from User Cart: api/users/cart/{user_id}/{product_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteProduct($user_id, $product_id)
    {
        CartItem::where('user_id', $user_id)->where('product_id', $product_id)->delete();

        return response()->json(['message' => 'Product deleted from Cart']);
    }

    /**
     * Get Daily Nutrition: api/users/dailyNutrition
     *
     * @return \Illuminate\Http\Response
     */
    public function getDailyNutrition($user_id, $date)
    {
        $dailyNutritions = User::find($user_id)->dailyNutritions;
        $dailyNutrition = $dailyNutritions->where('date', $date)->first();
        $dailyNutrition->history_items = $dailyNutrition->historyItems;

        return response()->json($dailyNutrition);
    }

    /**
     * Post Daily Nutrition item: api/users/dailyNutrition/item
     *
     * @return \Illuminate\Http\Response
     */
    public function addFood(Request $request)
    {
        $request->validate([
            'daily_nutrition_id' => 'required',
            'name' => 'required',
            'api_id' => 'required',
            'poid'=> 'required'
        ]);

        $newItem = new NutritionItem([
            'daily_nutrition_id' => $request->get('daily_nutrition_id'),
            'name' => $request->get('name'),
            'api_id' => $request->get('api_id'),
            'category' => $request->get('category'),
            'poid' => $request->get('poid'),
            'energy' => $request->get('energy'),
            'protein' => $request->get('protein'),
            'fat' => $request->get('fat'),
            'fiber' => $request->get('fiber'),
            'carbohydrate' => $request->get('carbohydrate'),
        ]);

        $newItem->save();

        $dailyNutrition = DailyNutrition::findOrFail($request->get('daily_nutrition_id'));
        $dailyNutrition->energy_consumed += $request->get('energy');
        $dailyNutrition->protein_consumed += $request->get('protein');
        $dailyNutrition->fat_consumed += $request->get('fat');
        $dailyNutrition->fiber_consumed += $request->get('fiber');
        $dailyNutrition->carbohydrate_consumed += $request->get('carbohydrate');
        $dailyNutrition->save();

        return response()->json(['message' => 'Food Added to daily Nutrition']);
    }

    /**
     * Delete Daily Nutrition item: api/users/dailyNutrition/item/{daily_nutrition_id}/{food_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteFood($daily_nutrition_id, $food_id)
    {

        $item = NutritionItem::findOrFail($food_id);
        $dailyNutrition = DailyNutrition::findOrFail($daily_nutrition_id);
        $dailyNutrition->energy_consumed -= $item->energy;
        $dailyNutrition->protein_consumed -= $item->protein;
        $dailyNutrition->fat_consumed -= $item->fat;
        $dailyNutrition->fiber_consumed -= $item->fiber;
        $dailyNutrition->carbohydrate_consumed -= $item->carbohydrate;

        $item->delete();
        $dailyNutrition->save();



        return response()->json(['message' => 'Food deleted from Daily Nutrition']);
    }
}
