<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * GET: api/images
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    /**
     * POST: api/images
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required'],
            'img_url' => ['required', 'string'],
        ]);

        $newImage = new Image([
            "user_id" => $request->get('user_id'),
            "img_url" => $request->get('img_url'),
        ]);
        $newImage->save();
        return response()->json(['message' => 'Image is stored successfully !']);
    }

    /**
     * GET: api/images/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        $images = Image::where('user_id', '=', $user_id)->orderBy('created_at', 'desc')->get();
        if(count($images)){
            return response()->json($images);
        }

        return response()->json(false);
    }

    /**
     * GET: api/images/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getImageByUserId($user_id)
    {
        $images = Image::where('user_id', '=', $user_id)->orderBy('created_at', 'desc')->get();
        if(count($images)){
            return response()->json($images);
        }

        return response()->json(false);
    }

    /**
     * PUT/PATCH: api/images/{id}
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

        $Image = Image::findOrFail($id);

        if ($request->get('image_url')) {
            $Image->image_url = $request->get('image_url');
        }

        if ($request->get('content')) {
            $Image->content = $request->get('content');
        }

        $Image->save();

        return response()->json(['message' => 'Image was updated successfully !']);
    }

    /**
     * DELETE: api/images/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Image = Image::findOrFail($id);
        $Image->delete();

        return response()->json(['message' => 'Image was deleted successfully !']);
    }
}
