<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    /**
     * GET: api/Replys
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $replies = Reply::all();
        foreach($replies as $reply){
            $reply->user = $reply->user;
        }
        return response()->json($replies);
    }

    /**
     * POST: api/Replys
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'comment_id' => ['required'],
            'content' => ['required', 'string'],
        ]);

        $newReply = new Reply([
            "user_id" => $request->get('user_id'),
            "comment_id" => $request->get('comment_id'),
            "content" => $request->get('content'),
        ]);
        $newReply->save();
        return response()->json(['message' => 'Reply is stored successfully !']);
    }

    /**
     * GET: api/Replys/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reply = Reply::findOrFail($id);
        $reply = [
            'id' => $reply->id,
            'user_id' => $reply->user_id,
            'comment_id' => $reply->comment_id,
            'nbr_likes' => $reply->nbr_likes,
            'content' => $reply->content,
            'user' => $reply->user,
        ];
        return response()->json($reply);
    }

    /**
     * GET: repliesByCommentId/{comment_id}
     *
     * @param  int  $user_id
     * @return \Illuminate\Http\Response
     */
    public function getReplyByCommentId($comment_id)
    {
        $replies = Reply::where('comment_id', '=', $comment_id)->get();

        foreach ($replies as $reply) {
            $reply->user = $reply->user;
        }
        return response()->json($replies);
    }

    /**
     * PUT/PATCH: api/Replys/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required',
            'comment_id' => 'required',
            'content' => 'required',
        ]);

        $reply = Reply::findOrFail($id);

        if ($request->get('content')) {
            $reply->content = $request->get('content');
        }

        if ($request->get('nbr_likes')) {
            $reply->nbr_likes = $request->get('nbr_likes');
        }

        $reply->save();

        return response()->json(['message' => 'Reply was updated successfully !']);
    }

    /**
     * DELETE: api/Replys/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reply = Reply::findOrFail($id);
        $reply->delete();

        return response()->json(['message' => 'Reply was deleted successfully !']);
    }
}
