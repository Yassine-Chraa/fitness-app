<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * GET: api/Posts
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        foreach ($posts as $post) {
            $post->comments = $post->comments;
            $post->reactions = $post->reactions;
            $post->user = $post->user;
            $post->nbr_likes = count($post->reactions);
            $post->nbr_comments = count($post->comments);
        }
        return response()->json($posts);
    }

    /**
     * POST: api/Posts
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'content' => ['required', 'string'],
        ]);

        $newPost = new Post([
            "user_id" => $request->get('user_id'),
            "content" => $request->get('content'),
            "image_url" => $request->get('image_url'),
        ]);
        $newPost->save();
        return response()->json(['message' => 'Post is stored successfully !']);
    }

    /**
     * GET: api/Posts/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        $post = [
            'id' => $post->id,
            'user_id' => $post->user_id,
            'content' => $post->content,
            'image_url' => $post->image_url,
            'comments' => $post->comments,
            'reactions' => $post->reactions,
        ];
        $post['nbr_likes'] = count($post['reactions']);
        $post['nbr_comments'] = count($post['comments']);
        return response()->json($post);
    }

    /**
     * GET: api/Posts/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getPostByUserId($user_id)
    {
        $posts = Post::where('user_id', '=', $user_id)->orderBy('created_at', 'desc')->get();

        foreach ($posts as $post) {
            $temp = clone $post;
            $post->user = $post->user;
            $post->nbr_likes = count($temp->reactions);
            $post->nbr_comments = count($temp->comments);
        }
        return response()->json($posts);
    }

    /**
     * PUT/PATCH: api/Posts/{id}
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

        $post = Post::findOrFail($id);

        if ($request->get('image_url')) {
            $post->image_url = $request->get('image_url');
        }

        if ($request->get('content')) {
            $post->content = $request->get('content');
        }

        $post->save();

        return response()->json(['message' => 'Post was updated successfully !']);
    }

    /**
     * DELETE: api/Posts/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post was deleted successfully !']);
    }
}
