<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * GET: api/activities
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activities = Activity::all();
        return response()->json($activities);
    }

    /**
     * POST: api/activities
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
        ]);

        $newactivity = new Activity([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
        ]);
        $newactivity->save();
        return response()->json(['message' => 'Activity stored']);
    }

    /**
     * GET: api/activities/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $activity = Activity::findOrFail($id);
        return response()->json($activity);
    }

    /**
     * PUT/PATCH: api/activities/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        $activity = Activity::findOrFail($id);
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
        ]);
        $activity->name = $request->get('name');
        $activity->category = $request->get('category');
        $activity->description = $request->get('description');

        $activity->save();
        return response()->json(['message' => 'Activity updated']);
    }

    /**
     * DELETE: api/activities/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();

        return response()->json(['message' => 'Activity deleted']);
    }
}
