<?php

namespace App\Models;

use App\Models\Kriteria;
use App\Models\Alternatif;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function kriteria()
    {
        return $this->hasMany(Kriteria::class);
    }
    public function alternatif()
    {
        return $this->hasMany(Alternatif::class);
    }


}
