<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use Illuminate\Http\Request;

class EquipementController extends Controller
{
    /**
     * GET: api/equipements
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $equipements = Equipement::all();
        return response()->json($equipements);
    }

    /**
     * POST: api/equipements
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

        $newEquipement = new Equipement([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'image' => $request->get('image'),
        ]);
        $newEquipement->save();
        return response()->json(['message' => 'Equipement stored']);
    }

    /**
     * GET: api/equipements/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $equipement = Equipement::findOrFail($id);
        return response()->json($equipement);
    }

    /**
     * PUT/PATCH: api/equipements/{id}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $equipement = Equipement::findOrFail($id);
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
        ]);
        $equipement->name = $request->get('name');
        $equipement->category = $request->get('category');
        $equipement->description = $request->get('description');
        $equipement->image = $request->get('image');

        $equipement->save();
        return response()->json(['message' => 'Equipement updated']);
    }

    /**
     * DELETE: api/equipements/{id}
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $equipement = Equipement::findOrFail($id);
        $equipement->delete();

        return response()->json(['message' => 'Equipement deleted']);
    }
}
