<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\WorkOutExercise;
use Illuminate\Http\Request;

class WorkoutExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workOutExercises = WorkOutExercise::all();
        return response()->json($workOutExercises);
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
        $newWorkOutExercise = new WorkOutExercise([
            "workout_id" => $request->get('workout_id'),
            "exercise_id" => $request->get('exercise_id'),
        ]);
        $newWorkOutExercise->save();
        return response()->json(['message' => 'WorkOutExercise created successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $workOutWorkOutExercise = WorkOutExercise::findOrFail($id);
        return response()->json($workOutWorkOutExercise);
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
        $workOutWorkOutExercise = WorkOutExercise::findOrFail($id);
        if ($request->get('workout_id')) {
            $workOutWorkOutExercise->workout_id = $request->get('workout_id');
        }

        if ($request->get('exercise_id')) {
            $workOutWorkOutExercise->workout_id = $request->get('exercise_id');
        }

        $workOutWorkOutExercise->save();
        return response()->json(['message' => "WorkOutExercise updated successfully !"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($workout_id, $exercise_id)
    {
        $workOutExercises = WorkOutExercise::all();
        $workOutExercise = $workOutExercises->filter(function ($item) use($workout_id,$exercise_id) {
            return $item->workout_id == $workout_id && $item->exercise_id == $exercise_id;
        })->first();
        $workOutExercise->delete();
        return response()->json(['message' => 'WorkOutExercise deleted successfully !']);
    }
}
