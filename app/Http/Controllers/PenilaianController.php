<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;
use App\Models\Alternatif;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PenilaianController extends Controller
{
    public function index(Request $request)
    {
        $items = Item::all();
        $item = collect();
        $alternatif = collect();
        $kriteria = collect();
        $sub_kriteria = collect();

        if ($request->has('item_id') && $request->item_id != '') {
            $item_id = $request->item_id;
            $item = Item::findOrFail($item_id);
            $alternatif = $item->alternatif();
            $kriteria = $item->kriteria;
            dd($kriteria);
            $sub_kriteria = $kriteria->subKriteria;
        }
        return Inertia::render('Main/Penilaian', [
            'items' => $items,
            'item' => $item,
            'alternatif' => $alternatif,
            'kriteria' => $kriteria,
            'sub_kriteria' => $sub_kriteria,
        ]);
    }
}
