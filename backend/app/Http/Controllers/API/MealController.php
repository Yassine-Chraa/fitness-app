<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use Illuminate\Http\Request;

class MealController extends Controller
{
    /**
     * GET: api/meals
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meals = Meal::all();
        return response()->json($meals);
    }

    /**
     * POST: api/meals
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
            'weight' => 'required',
            'isVegan' => 'required',
        ]);

        $newMeal = new Meal([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'weight' => $request->get('weight'),
            'isVegan' => $request->get('isVegan'),
        ]);
        $newMeal->save();
        return response()->json(['message' => 'Meal stored']);
    }

    /**
     * GET: api/meals/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $meal = Meal::findOrFail($id);
        return response()->json($meal);
    }

    /**
     * PUT/PATCH: api/meals/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $meal = Meal::findOrFail($id);
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
            'weight' => 'required',
            'isVegan' => 'required',
        ]);
        $meal->name = $request->get('name');
        $meal->category = $request->get('category');
        $meal->description = $request->get('description');
        $meal->weight = $request->get('weight');
        $meal->isVegan = $request->get('isVegan');

        $meal->save();
        return response()->json(['message' => 'Meal updated']);
    }

    /**
     * DELETE: api/meals/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $meal = Meal::findOrFail($id);
        $meal->delete();

        return response()->json(['message' => 'Meal deleted']);
    }
}
