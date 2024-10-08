<?php

namespace App\Models;

use App\Models\Item;
use App\Models\SubKriteria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kriteria extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function subKriteria()
    {
        return $this->hasMany(SubKriteria::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

}

