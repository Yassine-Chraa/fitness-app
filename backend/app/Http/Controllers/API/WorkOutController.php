<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\WorkOut;
use GuzzleHttp\Psr7\Request;

class WorkOutController extends Controller
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
        $newExercise = new Exercise([
            "program_id" => $request->get('program_id'),
            "title" => $request->get('title'),
            "duration" => $request->get('duration'),
            "day" => $request->get('day'),
            'state' => $request->get('state'),
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
        if ($request->get('program_id')) {
            $exercise->program_id = $request->get('program_id');
        }
        if ($request->get('title')) {
            $exercise->title = $request->get('title');
        }
        if ($request->get('duration')) {
            $exercise->duration = $request->get('duration');
        }
        if ($request->get('day')) {
            $exercise->day = $request->get('day');
        }
        if ($request->get('state')) {
            $exercise->state = $request->get('state');
        }

        $exercise->save();
        return Response()->json(['message' => "Exercise updated successfully !"]);
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

