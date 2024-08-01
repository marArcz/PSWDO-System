<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryTrackHistory extends Model
{
    use HasFactory;
    protected $with = [
        "unit"
    ];
    protected $fillable = [
        'name',
        'unit_cost',
        'quantity',
        'batch_no',
        'expiration',
        'from',
        'unit_id',
        'sub_unit_quantity',
        'purpose',
        'for'
    ];

    public function unit(): BelongsTo{
        return $this->belongsTo(Unit::class);
    }
}
