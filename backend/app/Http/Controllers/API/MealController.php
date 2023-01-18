<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meal;
use Illuminate\Http\Request;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meals = Meal::all();
        return response()->json($meals);
    }

    /**
     * Store a newly created resource in storage.
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
            'isVegetarian' => 'required',
            'isVegan' => 'required',
        ]);

        $newMeal = new Meal([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'weight' => $request->get('weight'),
            'isVegetarian' => $request->get('isVegetarian'),
            'isVegan' => $request->get('isVegan'),
        ]);
        $newMeal->save();
        return response()->json(['message' => 'Meal stored']);
    }

    /**
     * Display the specified resource.
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $equipement = Meal::findOrFail($id);
        $request->validate([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'weight' => $request->get('weight'),
            'isVegetarian' => $request->get('isVegetarian'),
            'isVegan' => $request->get('isVegan'),
        ]);
        $equipement->name = $request->get('name');
        $equipement->category = $request->get('category');
        $equipement->description = $request->get('description');
        $equipement->description = $request->get('weight');
        $equipement->description = $request->get('isVegetarian');
        $equipement->description = $request->get('isVegan');
        $equipement->save();
        return response()->json(['message' => 'meal updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $equipement = Meal::findOrFail($id);
        $equipement->delete();

        return response()->json(['message' => 'Meal deleted']);
    }
}
