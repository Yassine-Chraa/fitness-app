<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programs = Program::all();
        return response()->json($programs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newProgram = new Program([
            "main_img" => $request->get('main_img'),
            "title" => $request->get('title'),
            "description" => $request->get('description'),
            "start_time" => $request->get('start_time'),
            "end_time" => $request->get('end_time'),
            "duration" => $request->get('duration'),
            "break_duration" => $request->get('break_duration'),
            'category' => $request->get('category'),
            'state' => $request->get('state'),
            "isFree" => $request->get('isFree'),
        ]);
        $newProgram->save();
        return response()->json(['message' => 'Program created successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $program = Program::findOrFail($id);
        return response()->json($program);
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
        $program = Program::findOrFail($id);
        if ($request->get('main_img')) {
            $program->name_img = $request->get('main_img');
        }
        if ($request->get('title')) {
            $program->title = $request->get('title');
        }
        if ($request->get('description')) {
            $program->description = $request->get('description');
        }
        if ($request->get('start_time')) {
            $program->start_time = $request->get('start_time');
        }
        if ($request->get('end_time')) {
            $program->end_time = $request->get('end_time');
        }
        if ($request->get('duration')) {
            $program->duration = $request->get('duration');
        }
        if ($request->get('break_duration')) {
            $program->break_duration = $request->get('break_duration');
        }
        if ($request->get('category')) {
            $program->category = $request->get('category');
        }
        if ($request->get('state')) {
            $program->category = $request->get('state');
        }
        $program->isFree = $request->get('isFree');

        $program->save();
        return response()->json(['message' => "program updated successfully !"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Program::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Program deleted successfully !']);
    }
}
