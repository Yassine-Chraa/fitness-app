<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductRating;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET: api/products
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyword = $request->has('keyword') ? $request->get('keyword') : '';
        if ($request->has('category_id')) {
            $products = Product::where('category_id', $request->get('category_id'))->where('name', 'LIKE', $keyword . '%')->get();
        } else {
            $products = Product::where('name', 'LIKE', $keyword . '%')->get();
        }

        foreach ($products as $i => $product) {
            $products[$i]->category = $product->category;

            $ratings = ProductRating::where('product_id', $products[$i]->id)->get();
            $total = 0;
            foreach ($ratings as $item) {
                $total += $item->rating;
            }
            $products[$i]->reviews = count($ratings);
            if ($products[$i]->reviews > 0) $products[$i]->rating = $total / $products[$i]->reviews;
            else $products[$i]->rating = 0;
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
            'category_id' => 'required',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'company' => 'required'
        ]);

        $newProduct = new Product([
            'name' => $request->get('name'),
            'product_img' => $request->get('product_img'),
            'category_id' => $request->get('category_id'),
            'description' => $request->get('description'),
            'stock' => $request->get('stock'),
            'price' => $request->get('price'),
            'company' => $request->get('company'),
        ]);
        $newProduct->save();

        return response()->json(['message' => 'Product Added']);
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
        $product->category = $product->category;

        $total = 0;
        $ratings = ProductRating::where('product_id', $product->id)->get();
        foreach ($ratings as $item) {
            $total += $item->rating;
        }
        $product->reviews = count($ratings);
        if ($product->reviews > 0) $product->rating = $total / $product->reviews;
        else $product->rating = 0;
        $product->ratings = null;
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
            'category_id' => 'required',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'company' => 'required'
        ]);
        $product->name = $request->get('name');
        $product->product_img = $request->get('product_img');
        $product->category_id = $request->get('category_id');
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

    public function addReview(Request $request)
    {

        $request->validate([
            'user_id' => 'required',
            'product_id' => 'required',
            'rating' => 'required',
        ]);
        $ratings = ProductRating::where('user_id', $request->get('user_id'))->where('product_id', $request->get('product_id'))->get();
        if (count($ratings) > 0) {
            ProductRating::where('user_id', $request->get('user_id'))->where('product_id', $request->get('product_id'))->update(['rating' => $request->get('rating')]);
            return response()->json(['rating' => 'Rating updated']);
        } else {
            $newRating = new ProductRating([
                'user_id' => $request->get('user_id'),
                'product_id' => $request->get('product_id'),
                'rating' => $request->get('rating'),
            ]);
            $newRating->save();
            return response()->json(['rating' => 'Rating added']);
        }
    }
}
