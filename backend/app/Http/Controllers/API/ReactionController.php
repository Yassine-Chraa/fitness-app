<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reaction;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    /**
     * GET: api/Reactions
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reactions = Reaction::all();
        foreach($reactions as $reaction){
            $reaction->user = $reaction->user;
        }
        return response()->json($reactions);
    }

    /**
     * POST: api/Reactions
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'post_id' => ['required'],
        ]);

        $newReaction = new Reaction([
            "user_id" => $request->get('user_id'),
            "post_id" => $request->get('post_id'),
        ]);
        $newReaction->save();
        return response()->json(['message' => 'Reaction is stored successfully !']);
    }

    /**
     * GET: api/Reactions/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reaction = Reaction::findOrFail($id);
        $reaction = [
            'id' => $reaction->id,
            'user_id' => $reaction->user_id,
            'post_id' => $reaction->post_id,
            'user' => $reaction->user,
        ];
        return response()->json($reaction);
    }

    /**
     * DELETE: api/Reactions/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reaction = Reaction::findOrFail($id);
        $reaction->delete();

        return response()->json(['message' => 'Reaction was deleted successfully !']);
    }
}
