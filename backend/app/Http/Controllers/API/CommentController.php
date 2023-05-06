<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * GET: api/Comments
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::all();
        foreach ($comments as $comment) {
            $comment->replies = $comment->replies;
            $comment->nbr_replies = count($comment->replies);
            $comment->user = $comment->user;
        }
        return response()->json($comments);
    }

    /**
     * POST: api/Comments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'post_id' => ['required'],
            'content' => ['required', 'string'],
        ]);

        $newComment = new Comment([
            "user_id" => $request->get('user_id'),
            "post_id" => $request->get('post_id'),
            "content" => $request->get('content'),
        ]);
        $newComment->save();
        return response()->json(['message' => 'Comment is stored successfully !']);
    }

    /**
     * GET: api/Comments/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        $comment = [
            'id' => $comment->id,
            'user_id' => $comment->user_id,
            'post_id' => $comment->post_id,
            'content' => $comment->content,
            'nbr_likes' => $comment->nbr_likes,
            'replies' => $comment->replies,
            'user' => $comment->user,
        ];
        return response()->json($comment);
    }

    /**
     * GET: Comment/commentsByPostId/{post_id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCommentByPostId($post_id)
    {
        $comments = Comment::where('post_id', '=', $post_id)->get();

        foreach ($comments as $comment) {
            $temp = clone $comment;
            $comment->user = $comment->user;
            $comment->nbr_replies = count($temp->replies);
        }
        return response()->json($comments);
    }

    /**
     * PUT/PATCH: api/Comments/{id}
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

        $comment = Comment::findOrFail($id);

        if ($request->get('content')) {
            $comment->content = $request->get('content');
        }

        if ($request->get('nbr_likes')) {
            $comment->nbr_likes = $request->get('nbr_likes');
        }

        $comment->save();

        return response()->json(['message' => 'Comment was updated successfully !']);
    }

    /**
     * DELETE: api/Comments/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment was deleted successfully !']);
    }
}
