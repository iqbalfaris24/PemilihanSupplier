<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kriteria;
use App\Models\SubKriteria;
use Illuminate\Http\Request;

class SubKriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kriteria_id' => ['required'],
            'nama_subKriteria' => ['required'],
            'nilai_subKriteria' => ['required'],
        ]);

        $kriteria = Kriteria::findOrFail($request->kriteria_id);
        $kriteria->subKriteria()->create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show($kriteriaId)
    {
        $kriteria = Kriteria::findOrFail($kriteriaId);
        $subKriteria = $kriteria->subKriteria()->paginate(5);
        return Inertia::render('Main/SubKriteria', [
            'kriteria' => $kriteria,
            'subKriteria' => $subKriteria,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubKriteria $subKriteria)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $subKriteria = SubKriteria::findOrFail($request->id);
        $validatedData = $request->validate([
            'kriteria_id' => ['required'],
            'nama_subKriteria' => ['required'],
            'nilai_subKriteria' => ['required'],
        ]);
        $subKriteria->update($validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $subKriteria = SubKriteria::findOrFail($id);
        $subKriteria->delete();
    }
}
