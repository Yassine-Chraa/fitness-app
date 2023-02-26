<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET: api/products
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * POST: api/products
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
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'company'=> 'required'
        ]);

        $newProduct = new Product([
            'name' => $request->get('name'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'stock' => $request->get('stock'),
            'price' => $request->get('price'),
            'company' => $request->get('company'),
            'color' => $request->get('color'),
            'size' => $request->get('size'),
        ]);
        $newProduct->save();
        return response()->json(['message' => 'Product stored']);
    }

    /**
     * GET: api/products/{id}
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
     * PUT/PATCH: api/products/{id}
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
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'company'=> 'required'
        ]);
        $product->name = $request->get('name');
        $product->category = $request->get('category');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->stock = $request->get('stock');
        $product->company = $request->get('company');
        $product->color = $request->get('color');
        $product->size = $request->get('size');

        $product->save();
        return response()->json(['message' => 'Product updated']);
    }

    /**
     * DELETE: api/products/{id}
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
