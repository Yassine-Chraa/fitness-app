<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feedbacks;
use App\Models\User;
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
        $feedbacks = Feedbacks::all();

        foreach ($feedbacks as $i => $feedback) {
            $feedbacks[$i] = ['id' => $feedback->id, 'message' => $feedback->message, 'user' => $feedback->user];
        }
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

        $newFeedback = new Feedbacks([
            'user_id' => $request->get('user_id'),
            'message' => $request->get('message'),
        ]);
        $newFeedback->save();
        return response()->json(['message' => 'Feedbacks stored']);
    }

    /**
     * GET: api/feedbacks/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feedback = Feedbacks::findOrFail($id);
        $feedback = ['id' => $feedback->id, 'message' => $feedback->message, 'user' => $feedback->user];
        return response()->json($feedback);
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
        $feedback = Feedbacks::findOrFail($id);
        $request->validate([
            'user_id' => 'required',
            'message' => 'required',
        ]);
        $feedback->user_id = $request->get('user_id');
        $feedback->message = $request->get('message');

        $feedback->save();
        return response()->json(['message' => 'Feedbacks updated']);
    }

    /**
     * DELETE: api/feedbacks/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback = Feedbacks::findOrFail($id);
        $feedback->delete();

        return response()->json(['message' => 'Feedbacks deleted']);
    }
}
