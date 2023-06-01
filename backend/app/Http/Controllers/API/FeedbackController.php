<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Feedbacks;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

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
            $feedbacks[$i] = [
                'id' => $feedback->id,
                'message' => $feedback->message,
                'user' => $feedback->user,
                'f1' => $feedback->f1,
                'f2' => $feedback->f1,
                'f3' => $feedback->f1,
                'f4' => $feedback->f1,
            ];
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
        ]);

        $id = Feedbacks::select('id')
            ->where('user_id', '=', $request->get('user_id'))
            ->get();

        if (count($id) == 0) {
            $newFeedback = new Feedbacks([
                'user_id' => $request->get('user_id'),
                'message' => $request->get('message'),
                'f1' =>  $request->get('f1'),
                'f2' =>  $request->get('f2'),
                'f3' =>  $request->get('f3'),
                'f4' =>  $request->get('f4'),
            ]);
            $newFeedback->save();
        } else {
            $feedback = Feedbacks::findOrFail($id[0])[0];

            $feedback->user_id = $request->get('user_id');
            if ($request->get('message')) {
                $feedback->message = $request->get('message');
            }
            if ($request->get('f1')) {
                $feedback->f1 = $request->get('f1');
            }
            if ($request->get('f2')) {
                $feedback->f2 = $request->get('f2');
            }
            if ($request->get('f3')) {
                $feedback->f3 = $request->get('f3');
            }
            if ($request->get('f4')) {
                $feedback->f4 = $request->get('f4');
            }

            $feedback->save();

            return response()->json(['message' => 'Feedback is updated successfully !']);
        }

        return response()->json(['message' => 'Feedback is stored successfully !']);
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
        $feedback = [
            'id' => $feedback->id,
            'message' => $feedback->message,
            'user' => $feedback->user,
            'f1' => $feedback->f1,
            'f2' => $feedback->f2,
            'f3' => $feedback->f3,
            'f4' => $feedback->f4,
        ];
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
        $request->validate([
            'user_id' => 'required',
        ]);

        $feedback = Feedbacks::findOrFail($id);

        $feedback->user_id = $request->get('user_id');
        if ($request->get('message')) {
            $feedback->message = $request->get('message');
        }
        if ($request->get('f1')) {
            $feedback->f1 = $request->get('f1');
        }
        if ($request->get('f2')) {
            $feedback->f2 = $request->get('f2');
        }
        if ($request->get('f3')) {
            $feedback->f3 = $request->get('f3');
        }
        if ($request->get('f4')) {
            $feedback->f4 = $request->get('f4');
        }

        $feedback->save();

        return response()->json(['message' => 'Feedback was updated successfully !']);
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

        return response()->json(['message' => 'Feedback was deleted successfully !']);
    }
}
