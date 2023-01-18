<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EquipementsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $equipements = Equipement::all();
        return response()->json($equipements);
    }

    /**
     * Store a newly created resource in storage.
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
        ]);
        $newEquipement->save();
        return response()->json(['message' => 'Equipement stored']);
    }

    /**
     * Display the specified resource.
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
     * Update the specified resource in storage.
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

        $equipement->save();
        return response()->json(['message' => 'Equipement updated']);
    }

    /**
     * Remove the specified resource from storage.
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
