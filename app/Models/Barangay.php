<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Barangay extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'population',
        'municipality_id',
        "families",
        "households",
        "evac_centers",
    ];


}
