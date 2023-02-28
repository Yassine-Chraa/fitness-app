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
        foreach ($products as $i => $product) {
            $products[$i] = $product;
            $products[$i]->items = $product->items;
        }
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
            'company' => 'required'
        ]);

        $newProduct = new Product([
            'name' => $request->get('name'),
            'product_img' => $request->get('product_img'),
            'category' => $request->get('category'),
            'description' => $request->get('description'),
            'stock' => $request->get('stock'),
            'price' => $request->get('price'),
            'company' => $request->get('company'),
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
        $product->items = $product->items;
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
            'company' => 'required'
        ]);
        $product->name = $request->get('name');
        $product->product_img = $request->get('product_img');
        $product->category = $request->get('category');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->stock = $request->get('stock');
        $product->company = $request->get('company');

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

    /*public function addReview(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        if ($product->reviews == 0) {
            $product->rating = 5;
        }
        $x =  $product->rating * $product->reviews;
        $product->rating = ($x + $request->get('rating')) / ($product->reviews + 1);
        $product->reviews += 1;
    }*/
}
