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
            $feedbacks[$i] = [
                'id' => $feedback->id,
                'message' => $feedback->message,
                'user' => $feedback->user,
                'f1' => $feedback->f1,
                'f2' => $feedback->f1,
                'f3' => $feedback->f1,
                'f4' => $feedback->f1,
                'f5' => $feedback->f1,
                'f6' => $feedback->f1,
                'f7' => $feedback->f1,
                'f8' => $feedback->f1,
                'f9' => $feedback->f1,
                'f10' => $feedback->f1,
                'f11' => $feedback->f1,
                'f12' => $feedback->f1,
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
            'message' => 'required',
        ]);



        $newFeedback = new Feedbacks([
            'user_id' => $request->get('user_id'),
            'message' => $request->get('message'),
            'f1' =>  $request->get('f1'),
            'f2' =>  $request->get('f2'),
            'f3' =>  $request->get('f3'),
            'f4' =>  $request->get('f4'),
            'f5' =>  $request->get('f5'),
            'f6' =>  $request->get('f6'),
            'f7' =>  $request->get('f7'),
            'f8' =>  $request->get('f8'),
            'f9' =>  $request->get('f9'),
            'f10' =>  $request->get('f10'),
            'f11' =>  $request->get('f11'),
            'f12' =>  $request->get('f12'),
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
        $feedback = [
            'id' => $feedback->id,
            'message' => $feedback->message,
            'user' => $feedback->user,
            'f1' => $feedback->f1,
            'f2' => $feedback->f2,
            'f3' => $feedback->f3,
            'f4' => $feedback->f4,
            'f5' => $feedback->f5,
            'f6' => $feedback->f6,
            'f7' => $feedback->f7,
            'f8' => $feedback->f8,
            'f9' => $feedback->f9,
            'f10' => $feedback->f10,
            'f11' => $feedback->f11,
            'f12' => $feedback->f12,
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
            'message' => 'required',
        ]);

        $feedback = Feedbacks::findOrFail($id);

        $feedback->user_id = $request->get('user_id');
        $feedback->message = $request->get('message');
        $feedback->f1 =  $request->get('f1')?$request->get('f1'): 1;
        $feedback->f2=  $request->get('f2')?$request->get('f2'): 1;
        $feedback->f3 =  $request->get('f3')?$request->get('f3'): 1;
        $feedback->f4 =  $request->get('f4')?$request->get('f4'): 1;
        $feedback->f5 =  $request->get('f5')?$request->get('f5'): 1;
        $feedback->f6 =  $request->get('f6')?$request->get('f6'): 1;
        $feedback->f7 =  $request->get('f7')?$request->get('f7'): 1;
        $feedback->f8 =  $request->get('f8')?$request->get('f8'): 1;
        $feedback->f9 =  $request->get('f9')?$request->get('f9'): 1;
        $feedback->f10 =  $request->get('f10')?$request->get('f10'): 1;
        $feedback->f11 =  $request->get('f11')?$request->get('f11'): 1;
        $feedback->f12 =  $request->get('f12')?$request->get('f12'): 1;
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
