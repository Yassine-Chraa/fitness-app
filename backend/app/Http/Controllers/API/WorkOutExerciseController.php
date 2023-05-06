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
    public function index(Request $request)
    {
        if ($request->has('workout_id')) {
            $workOutExercises = WorkOutExercise::where('workout_id', $request->get('workout_id'))->get();
        } else {
            $workOutExercises = WorkOutExercise::all();
        }
        foreach ($workOutExercises as $i => $exercise) {
            $workOutExercises[$i]->details = $exercise->details;
        }


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
        $request->validate([
            'workout_id' => 'required',
            'exercise_id' => 'required',
        ]);
        if ($request->has('sets')) {
            $newWorkoutExercise = new WorkOutExercise([
                "workout_id" => $request->get('workout_id'),
                "exercise_id" => $request->get('exercise_id'),
                "sets" => $request->get('sets'),
                "reps" => $request->get('reps'),
                "rest" => $request->get('rest')
            ]);
        } else {
            $newWorkoutExercise = new WorkOutExercise([
                "workout_id" => $request->get('workout_id'),
                "exercise_id" => $request->get('exercise_id'),
            ]);
        }

        $newWorkoutExercise->save();
        return response()->json(['message' => 'Exercise added to workout !']);
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
        $workoutExercise = WorkOutExercise::findOrFail($id);
        $workoutExercise->sets = $request->get('sets');
        $workoutExercise->reps = $request->get('reps');
        $workoutExercise->rest = $request->get('rest');

        $workoutExercise->save();
        return response()->json(['message' => "Workout Exercise updated successfully !"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workoutExercise = WorkOutExercise::findOrFail($id);
        $workoutExercise->delete();
        return response()->json(['message' => 'Workout Exercise deleted successfully !']);
    }
}
