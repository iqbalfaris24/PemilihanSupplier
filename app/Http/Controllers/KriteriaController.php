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
            $kriteria = Kriteria::where('item_id', $request->item_id)->paginate(100);
            foreach ($kriteria as $item) {
                $item->sub_kriteria_data = json_decode($item->sub_kriteria_data);
            }
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
        // dd($request);
        $validated = $request->validate([
            'item_id' => ['required'],
            'kode_kriteria' => ['required'],
            'nama_kriteria' => ['required'],
            'sub_kriteria_status' => ['nullable'], // Pastikan ini adalah array
            'sub_kriteria_data' => ['nullable', 'array'], // Pastikan ini adalah array
            'status' => ['required'],
        ]);
        $validated['sub_kriteria_data'] = json_encode($validated['sub_kriteria_data']);

        Kriteria::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show($kriteriaId)
    {
        $kriteria = Kriteria::findOrFail($kriteriaId);
        $subKriteria = $kriteria->sub_kriteria_data;
        return Inertia::render('Main/SubKriteria', [
            'kriteria' => $kriteria,
            'subKriteria' => json_decode($subKriteria),
        ]);
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
        $kriteria->kode_kriteria = $request->input('kode_kriteria', $kriteria->kode_kriteria);
        $kriteria->nama_kriteria = $request->input('nama_kriteria', $kriteria->nama_kriteria);
        $kriteria->sub_kriteria_status = $request->input('sub_kriteria_status', $kriteria->sub_kriteria_status);
        $kriteria->sub_kriteria_data = json_encode($request->input('sub_kriteria_data', json_decode($kriteria->sub_kriteria_data)));
        $kriteria->status = $request->input('status', $kriteria->status);
        $kriteria->update();
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
