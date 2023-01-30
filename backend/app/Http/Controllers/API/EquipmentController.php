<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Equipments;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * GET: api/equipments
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $equipmentss = Equipments::all();
        return response()->json($equipmentss);
    }

    /**
     * POST: api/equipments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
        ]);

        $newEquipments = new Equipments([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'image' => $request->get('image'),
        ]);
        $newEquipments->save();
        return response()->json(['message' => 'Equipments stored']);
    }

    /**
     * GET: api/equipments/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $equipments = Equipments::findOrFail($id);
        return response()->json($equipments);
    }

    /**
     * PUT/PATCH: api/equipments/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $equipments = Equipments::findOrFail($id);
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
        ]);
        $equipments->name = $request->get('name');
        $equipments->category = $request->get('category');
        $equipments->description = $request->get('description');
        $equipments->image = $request->get('image');

        $equipments->save();
        return response()->json(['message' => 'Equipments updated']);
    }

    /**
     * DELETE: api/equipments/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $equipments = Equipments::findOrFail($id);
        $equipments->delete();

        return response()->json(['message' => 'Equipments deleted']);
    }
}
