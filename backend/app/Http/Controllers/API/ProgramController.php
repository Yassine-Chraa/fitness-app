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
            foreach ($programs as $i => $program) {
                $programs[$i]->workouts = $program->workouts;
                foreach ($program->workouts as $j => $workout) {
                    $programs[$i]->workouts[$j]->exercises = $workout->exercises;
                    foreach ($workout->exercises as $k => $exercise) {
                        $programs[$i]->workouts[$j]->exercises[$k]->details = $exercise->details;
                    }
                }
            }
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
            "difficulty_level" => $request->get('difficulty_level'),
            'category' => $request->get('category'),
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
        $program->workouts = $program->workouts()->get();
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
            $program->main_img = $request->get('main_img');
        }
        if ($request->get('title')) {
            $program->title = $request->get('title');
        }
        if ($request->get('description')) {
            $program->description = $request->get('description');
        }
        if ($request->get('category')) {
            $program->category = $request->get('category');
        }
        if ($request->get('difficulty_level')) {
            $program->difficulty_level = $request->get('difficulty_level');
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
        $program = Program::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully !']);
    }
}
