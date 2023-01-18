<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
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
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $newProduct = new Product([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'image' => $request->get('image'),
            'stock' => $request->get('stock'),
            'prix' => $request->get('prix'),
        ]);
        $newProduct->save();
        return response()->json(['message' => 'Product stored']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
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
        $product = Product::findOrFail($id);
        $request->validate([
            'name' => 'required|min:4',
            'category' => 'required',
            'description' => 'required',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        $product->name = $request->get('name');
        $product->category = $request->get('category');
        $product->description = $request->get('description');
        $product->image = $request->get('image');
        $product->prix = $request->get('prix');
        $product->stock = $request->get('stock');

        $product->save();
        return response()->json(['message' => 'Product updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
