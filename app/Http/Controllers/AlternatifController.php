<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;
use App\Models\Alternatif;
use Illuminate\Http\Request;

class AlternatifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $alternatif = collect();

        if ($request->has('item_id') && $request->item_id != '') {
            $alternatif = Alternatif::where('item_id', $request->item_id)->paginate(100);
        }
        $items = Item::all();
        return Inertia::render('Main/Alternatif', [
            'item' => $items,
            'alternatif' => $alternatif,
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
            'item_id' => ['required'],
            'kode_alternatif' => ['required'],
            'nama_alternatif' => ['required'],
            'telepon' => ['required'],
            'alamat' => ['required'],
        ]);

        Alternatif::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Alternatif $alternatif)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alternatif $alternatif)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alternatif $alternatif)
    {
        $alternatif = Alternatif::findOrFail($request->id);
        $validatedData = $request->validate([
            'item_id' => ['required'],
            'kode_alternatif' => ['required'],
            'nama_alternatif' => ['required'],
            'telepon' => ['required'],
            'alamat' => ['required'],
        ]);
        $alternatif->update($validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $alternatif = Alternatif::findOrFail($id);
        $alternatif->delete();
    }
}
