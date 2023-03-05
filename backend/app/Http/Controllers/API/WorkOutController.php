<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
        $workouts = WorkOut::all();
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
        $newWorkOut = new WorkOut([
            "program_id" => $request->get('program_id'),
            "title" => $request->get('title'),
            "duration" => $request->get('duration'),
            "day" => $request->get('day'),
            'state' => $request->get('state'),
        ]);
        $newWorkOut->save();
        return response()->json(['message' => 'WorkOut created successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $workout = WorkOut::findOrFail($id);
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
        $workout = WorkOut::findOrFail($id);
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

        $workout->save();
        return response()->json(['message' => "WorkOut updated successfully !"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workout = WorkOut::findOrFail($id);
        $workout->delete();

        return response()->json(['message' => 'WorkOut deleted successfully !']);
    }
}

