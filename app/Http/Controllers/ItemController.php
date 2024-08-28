<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::paginate(5);
        return Inertia::render('Main/Item', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_item' => ['required'],
            'nama_item' => ['required'],
        ]);

        Item::create($validated);
    }


    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        // $item = Item::findOrFail($request->id);
        // $validatedData = $request->validate([
        //     'kode_item' => 'required',
        //     'nama_item' => 'required',
        // ]);
        $item->kode_item = $request->input('kode_item', $item->kode_item);
        $item->nama_item = $request->input('nama_item', $item->nama_item);
        $item->update();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
    }
}
