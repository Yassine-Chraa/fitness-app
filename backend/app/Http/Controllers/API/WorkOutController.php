<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use App\Models\WorkoutExercise;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workouts = Workout::all();
        foreach ($workouts as $workout) {
            $workout->exercises = $workout->exercises;
        }
        return response()->json($workouts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newWorkout = new Workout([
            "program_id" => $request->get('program_id'),
            "title" => $request->get('title'),
            "duration" => $request->get('duration'),
            "day" => $request->get('day'),
            'state' => $request->get('state'),
        ]);
        $newWorkout->save();
        return response()->json(['message' => 'Workout created successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $workout = Workout::findOrFail($id);
        $workout->exercises = $workout->exercises;
        return response()->json($workout);
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
        $workout = Workout::findOrFail($id);
        if ($request->get('program_id')) {
            $workout->program_id = $request->get('program_id');
        }
        if ($request->get('title')) {
            $workout->title = $request->get('title');
        }
        if ($request->get('duration')) {
            $workout->duration = $request->get('duration');
        }
        if ($request->get('day')) {
            $workout->day = $request->get('day');
        }
        if ($request->get('state')) {
            $workout->state = $request->get('state');
        }

        if ($request->get('newExeIds')) {
            $newIds = $request->get('newExeIds');
            $oldExes = $workout->workout_exercise()->get();
            if ($oldExes != []) {
                foreach ($oldExes as $exe) {
                    WorkoutExercise::destroy($exe->id);
                }
            }

            $data = [];

            if ($newIds != []) {
                foreach ($newIds as $exercise_id) {
                    $workoutexercise = new WorkoutExercise([
                        'workout_id' => $id,
                        'exercise_id' => $exercise_id
                    ]);
                    array_push($data, $workoutexercise);
                }
            }
            $workout->workout_exercise()->saveMany($data);
        }

        $workout->save();

        return response()->json(['exercises' => $workout->workout_exercise()->get()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workout = Workout::findOrFail($id);
        $workout->delete();

        return response()->json(['message' => 'Workout deleted successfully !']);
    }
}
