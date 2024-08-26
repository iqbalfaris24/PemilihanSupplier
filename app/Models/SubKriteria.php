<?php

namespace App\Models;

use App\Models\Kriteria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubKriteria extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class);
    }

}
