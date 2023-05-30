<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\DailyNutrition;
use App\Models\NutritionItem;
use App\Models\Product;
use App\Models\Program;
use App\Models\User;
use App\Models\UserProgram;
use App\Models\UserWeight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * GET: api/users
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('role')) $data = User::where('role', $request->get('role'))->get();
        else $data = User::all();
        return response()->json($data);
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
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role'=> 'required'
        ]);
        $BMI =  $request->get('weight') / ($request->get('height') * $request->get('height'));
        $newUser = new User([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'role' => $request->get('role'),
            'profile' => $request->get('profile'),
            'birth_date' => $request->get('birth_date'),
            'BMI' => $BMI,
            'body_fat' => $request->get('body_fat') || 20.0,
            'height' => $request->get('height'),
            'gender' => $request->get('gender'),
            'top_goal' => $request->get('top_goal'),
            'weight' => $request->get('weight'),
            'workout_level' => $request->get('workout_level'),
            'bio' => $request->has('bio') ? $request->get('bio') : 'Bio Not Added',
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

            return response()->json($user);
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
     * Get User Cart Product: api/users/cart/{id}
     *
     * @return \Illuminate\Http\Response
     */
    public function getCart($id)
    {
        $cart = User::findOrFail($id)->cart;
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
     * Get Last  7 day Nutrition: api/users/dailyNutrition/{user_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function getLastNutritions($user_id)
    {
        $nutritions = DailyNutrition::where('user_id', $user_id)->orderBy('date', 'asc')->limit(7)->get();

        return response()->json($nutritions);
    }
    /**
     * Get Daily Nutrition: api/users/dailyNutrition/{user_id}/{date}
     *
     * @return \Illuminate\Http\Response
     */
    public function getDailyNutrition($user_id, $date)
    {
        $dailyNutrition = DailyNutrition::where('user_id', $user_id)->where('date', $date)->first();
        if ($dailyNutrition) $dailyNutrition->history_items = $dailyNutrition->historyItems;

        return response()->json($dailyNutrition);
    }

    /**
     * Post Daily Nutrition item: api/users/dailyNutrition/item/{user_id}/{date}
     *
     * @return \Illuminate\Http\Response
     */
    public function addFood(Request $request, $user_id, $date)
    {
        $request->validate([
            'name' => 'required',
            'api_id' => 'required',
            'poid' => 'required'
        ]);
        $dailyNutrition = DailyNutrition::where('user_id', $user_id)->where('date', $date)->first();
        if (!$dailyNutrition) {
            $newDailyNutrition = new DailyNutrition([
                'user_id' => $user_id,
                'date' => $date,
                'energy_consumed' => $request->get('energy'),
                'protein_consumed' => $request->get('protein'),
                'fat_consumed' => $request->get('fat'),
                'fiber_consumed' => $request->get('fiber'),
                'carbohydrate_consumed' => $request->get('carbohydrate'),
            ]);
            $newDailyNutrition->save();
            $id = $newDailyNutrition->id;
        } else {
            DailyNutrition::where('user_id', $user_id)
                ->where('date', $date)
                ->update(array(
                    'energy_consumed' => $dailyNutrition->energy_consumed + $request->get('energy'),
                    'protein_consumed' => $dailyNutrition->protein_consumed + $request->get('protein'),
                    'fat_consumed' => $dailyNutrition->fat_consumed + $request->get('fat'),
                    'fiber_consumed' => $dailyNutrition->fiber_consumed + $request->get('fiber'),
                    'carbohydrate_consumed' =>  $dailyNutrition->carbohydrate_consumed + $request->get('carbohydrate')
                ));
            $id = $dailyNutrition->id;
        }
        $newItem = new NutritionItem([
            'daily_nutrition_id' => $id,
            'name' => $request->get('name'),
            'api_id' => $request->get('api_id'),
            'category' => $request->get('category'),
            'poid' => $request->get('poid'),
            'energy' => $request->get('energy'),
            'protein' => $request->get('protein'),
            'fat' => $request->get('fat'),
            'fiber' => $request->get('fiber'),
            'carbohydrate' => $request->get('carbohydrate'),
            'time' => $request->get('time')
        ]);

        $newItem->save();

        return response()->json(['message' => 'Food Added to daily Nutrition']);
    }

    /**
     * Update Daily Nutrition item: api/users/dailyNutrition/item/{daily_nutrition_id}/{food_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function updateFood(Request $request, $daily_nutrition_id, $food_id)
    {
        /*$request->validate([
            'poid' => 'required'
        ]);*/


        $item = NutritionItem::findOrFail($food_id);
        $temp = ($request->get('poid') / $item->poid);


        $dailyNutrition = DailyNutrition::findOrFail($daily_nutrition_id);
        $dailyNutrition->energy_consumed += $item->energy * ($temp - 1);
        $dailyNutrition->protein_consumed += $item->protein * ($temp - 1);
        $dailyNutrition->fat_consumed += $item->fat * ($temp - 1);
        $dailyNutrition->fiber_consumed +=  $item->fiber * ($temp - 1);
        $dailyNutrition->carbohydrate_consumed += $item->carbohydrate * ($temp - 1);
        $dailyNutrition->save();


        $item->energy *= $temp;
        $item->protein *= $temp;
        $item->fat *= $temp;
        $item->fiber *= $temp;
        $item->carbohydrate *= $temp;
        $item->poid = $request->get('poid');

        $item->save();


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

    /**
     * Get User Weights: api/users/weights/{user_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function getWeights($user_id)
    {
        $weights = User::findOrFail($user_id)->weights()->orderBy('date', 'asc')->limit(7)->get();
        return response()->json($weights);
    }

    /**
     * Add Weight : api/users/weights/{user_id}
     *
     * @return \Illuminate\Http\Response
     */
    public function addWeight(Request $request, $user_id)
    {

        $request->validate([
            'value' => 'required|numeric|min:0',
            'date' => 'required',
        ]);

        $weight = new UserWeight([
            'user_id' => $user_id,
            'value' => $request->get('value'),
            'date' => $request->get('date'),
        ]);

        $weight->save();
        return response()->json(['message' => 'Weight Added']);
    }

    /**
     * Update Weight : api/users/weights/{id}
     *
     * @return \Illuminate\Http\Response
     */
    public function updateWeight(Request $request, $user_id)
    {

        /*$request->validate([
            'value' => 'required|numeric|min:0',
            'date' => 'required',
        ]);*/
        UserWeight::where('user_id', '=', $user_id)
            ->where('date', '=', $request->get('date'))
            ->update(array('value' =>  $request->get('value'), "date" => $request->get('date')));
        return response()->json(['message' => "Weight Updated"]);
    }

    /**
     * Delete Weight : api/users/weights/{user_id}/{date}
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteWeight($user_id, $date)
    {

        UserWeight::where('user_id', '=', $user_id)
            ->where('date', '=', $date)->delete();
        return response()->json(['message' => 'Weight Deleted']);
    }

    /**
     * Get User Programs: api/users/programs
     *
     * @return \Illuminate\Http\Response
     */
    public function getPrograms(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
        ]);
        if ($request->has('isUsed')) {
            $ret = User::findOrFail($request->get('user_id'))->programs->firstWhere('isUsed', $request->get('isUsed'));
            $ret->details->workouts = $ret->details->workouts;
            foreach ($ret->details->workouts as $j => $workout) {
                $ret->details->workouts[$j]->exercises = $workout->exercises;
                foreach ($workout->exercises as $k => $exercise) {
                    $ret->details->workouts[$j]->exercises[$k]->details = $exercise->details;
                }
            }
        } else {
            $ret = User::findOrFail($request->get('user_id'))->programs;
            foreach ($ret as $i => $program) {
                $ret[$i]->details->workouts = $program->details->workouts;
                foreach ($program->details->workouts as $j => $workout) {
                    $ret[$i]->details->workouts[$j]->exercises = $workout->exercises;
                    foreach ($workout->exercises as $k => $exercise) {
                        $ret[$i]->details->workouts[$j]->exercises[$k]->details = $exercise->details;
                    }
                }
            }
        }

        return response()->json($ret);
    }

    /**
     * POST: api/users/programs
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createProgram(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'title' => ['required', 'min:3', 'max:255'],
        ]);
        $newProgram = new Program([
            "title" => $request->get('title'),
            "difficulty_level" => $request->get('difficulty_level'),
            'category' => $request->get('category'),
            "isPublic" => 0
        ]);
        $newProgram->save();

        $newUserProgram = new UserProgram([
            "user_id" => $request->get('user_id'),
            "program_id" => $newProgram->id,
        ]);

        $newUserProgram->save();

        return response()->json(['message' => 'Program Was Created successfully !']);
    }

    /**
     * PUT: api/user/programs/{program_id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateProgram(Request $request, $program_id)
    {


        if ($request->has('isUsed')) {
            $request->validate([
                'isUsed' => 'required',
            ]);
            $userProgram = UserProgram::findOrFail($program_id);
            $userProgram->isUsed = $request->get('isUsed');
        } else {
            $request->validate([
                'title' => ['required', 'min:3', 'max:255'],
            ]);
            $userProgram = Program::findOrFail($program_id);
            $userProgram->title = $request->get('title');
            $userProgram->difficulty_level = $request->get('difficulty_level');
            $userProgram->category = $request->get('category');
        }

        $userProgram->save();

        return response()->json(['message' => 'Program Was Updated successfully !']);
    }

    /**
     * Delete: api/user/programs/{program_id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteProgram($program_id)
    {
        $userProgram = UserProgram::findOrFail($program_id);
        $id = $userProgram->program_id;
        $userProgram->delete();

        $program = Program::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program Was Deleted successfully !']);
    }

    /**
     * Post: api/user/programs/enroll
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function enrollProgram(Request $request)
    {
        $request->validate([
            'program_id' => ['required'],
            'user_id' => ['required'],
        ]);
        $newUserProgram = new UserProgram([
            "program_id" => $request->get('program_id'),
            "user_id" => $request->get('user_id'),
        ]);

        $newUserProgram->save();

        return response()->json(['message' => 'Program Was Enrolled successfully !']);
    }
}
