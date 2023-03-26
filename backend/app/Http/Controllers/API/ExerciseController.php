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
    public function index()
    {
        $exercises = Exercise::all();
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
        //still need validation here
        $newExercise = new Exercise([
            "workout_id" => $request->get('workout_id'),
            "title" => $request->get('title'),
            "description" => $request->get('description'),
            "api_id" => $request->get('api_id'),
            'rest' => $request->get('rest'),
            'reps' => $request->get('reps'),
            'sets' => $request->get('sets'),
            'state' => $request->get('state'),
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
        if ($request->get('workout_id')) {
            $exercise->workout_id = $request->get('workout_id');
        }
        if ($request->get('title')) {
            $exercise->title = $request->get('title');
        }
        if ($request->get('description')) {
            $exercise->description = $request->get('description');
        }
        if ($request->get('api_id')) {
            $exercise->api_id = $request->get('api_id');
        }
        if ($request->get('state')) {
            $exercise->state = $request->get('state');
        }
        if ($request->get('rest')) {
            $exercise->rest = $request->get('rest');
        }
        if ($request->get('reps')) {
            $exercise->reps = $request->get('reps');
        }
        if ($request->get('sets')) {
            $exercise->sets = $request->get('sets');
        }
        if ($request->get('category')) {
            $exercise->sets = $request->get('category');
        }

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
