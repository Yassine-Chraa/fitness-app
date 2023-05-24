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
        foreach ($reactions as $reaction) {
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
        $reactions = Reaction::where('post_id', '=', $request->post_id)->get();
        $num_likes = count($reactions);

        $request->validate([
            'user_id' => ['required'],
            'post_id' => ['required'],
        ]);

        $reactions = Reaction::where('post_id', '=', $request->post_id)
            ->where('user_id', '=', $request->user_id)
            ->get();
        if (count($reactions)) {
            return response()->json($num_likes);
        }

        $newReaction = new Reaction([
            "user_id" => $request->get('user_id'),
            "post_id" => $request->get('post_id'),
        ]);
        $newReaction->save();

        return response()->json($num_likes + 1);
    }

    /**
     * GET: api/Reactions/{id}
     *
     * @param  int  $post_id
     * @return \Illuminate\Http\Response
     */
    public function show($post_id)
    {
        $reactions = Reaction::where('post_id', '=', $post_id)->orderBy('created_at', 'asc')->get();

        foreach ($reactions as $reaction) {
            $reaction->user = $reaction->user;
        }

        return response()->json($reactions);
    }

    /**
     * get: api/dgetReactionByPostUserId
     *
     * @return \Illuminate\Http\Response
     */
    public function getReactionByPostUserId($user_id, $post_id)
    {
        $reactions = Reaction::where('post_id', '=', $post_id)
            ->where('user_id', '=', $user_id)
            ->get();

        if (count($reactions) == 0) {
            return response()->json(0);
        }

        return response()->json(1);
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

    /**
     * delete: api/deleteReactionByPostUserId
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteReactionByPostUserId($user_id, $post_id)
    {
        $reactions = Reaction::where('post_id', '=', $post_id)->get();
        $num_likes = count($reactions);

        $reactions = Reaction::where('post_id', '=', $post_id)
            ->where('user_id', '=', $user_id)
            ->get();

        if (count($reactions) == 0) {
            return response()->json($num_likes);
        }

        $reaction = $reactions[0];
        $reaction->delete();

        return response()->json($num_likes - 1);
    }
}
