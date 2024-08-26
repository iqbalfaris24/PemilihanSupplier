<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kriteria;
use Illuminate\Http\Request;

class KriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $kriteria = collect();

        if ($request->has('item_id') && $request->item_id != '') {
            $kriteria = Kriteria::where('item_id', $request->item_id)->paginate(5);
        }
        $items = Item::all();
        return Inertia::render('Main/Kriteria', [
            'item' => $items,
            'kriteria' => $kriteria,
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
            'kode_kriteria' => ['required'],
            'nama_kriteria' => ['required'],
            'sub_kriteria' => ['required'],
            'status' => ['required'],
        ]);

        Kriteria::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show($item_id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kriteria $kriteria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kriteria $kriteria)
    {
        $kriteria = Kriteria::findOrFail($request->id);
        $validatedData = $request->validate([
            'kode_kriteria' => ['required'],
            'nama_kriteria' => ['required'],
            'sub_kriteria' => ['required'],
            'status' => ['required'],
        ]);
        $kriteria->update($validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $kriteria = Kriteria::findOrFail($id);
        $kriteria->delete();
    }
}
