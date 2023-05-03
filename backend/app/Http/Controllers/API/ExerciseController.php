<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->has('category')){
            $exercises = Exercise::where('category',$request->get('category'))->get();
        }else{
            $exercises = Exercise::all();
        }
        return response()->json($exercises);
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
            'title' => 'required|min:3',
            'description' => 'required',
            'category' => 'required',
        ]);
        $newExercise = new Exercise([
            'img' => $request->get('img'),
            "title" => $request->get('title'),
            "description" => $request->get('description'),
            "api_id" => $request->get('api_id'),
            'category' => $request->get('category'),
        ]);
        $newExercise->save();
        return response()->json(['message' => 'Exercise created successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $exercise = Exercise::findOrFail($id);
        return response()->json($exercise);
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
        $exercise = Exercise::findOrFail($id);
        $request->validate([
            'title' => 'required|min:3',
            'description' => 'required',
            'category' => 'required',
        ]);

        $exercise->img = $request->get('img');
        $exercise->title = $request->get('title');
        $exercise->description = $request->get('description');
        $exercise->category = $request->get('category');
        $exercise->api_id = $request->get('api_id');
        $exercise->save();

        return response()->json(['message' => "Exercise updated successfully !"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();

        return response()->json(['message' => 'Exercise deleted successfully !']);
    }
}
