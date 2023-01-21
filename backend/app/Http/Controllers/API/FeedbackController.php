<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * GET: api/feedbacks
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feedbacks = Feedback::all();
        return response()->json($feedbacks);
    }

    /**
     * POST: api/feedbacks
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'message' => 'required',
        ]);

        $newFeedback = new Feedback([
            'user_id' => $request->get('user_id'),
            'message' => $request->get('message'),
        ]);
        $newFeedback->save();
        return response()->json(['message' => 'Feedback stored']);
    }

    /**
     * GET: api/feedbacks/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feedbacks = Feedback::findOrFail($id);
        return response()->json($feedbacks);
    }

    /**
     * PUT/PATCH: api/feedbacks/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);
        $request->validate([
            'user_id' => 'required',
            'message' => 'required',
        ]);
        $feedback->user_id = $request->get('user_id');
        $feedback->message = $request->get('message');

        $feedback->save();
        return response()->json(['message' => 'Feedback updated']);
    }

    /**
     * DELETE: api/feedbacks/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted']);
    }
}
