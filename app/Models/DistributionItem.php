<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DistributionItem extends Model
{
    use HasFactory;
    protected $with = ['unit'];

    protected $fillable = [
        "name",
        "quantity",
        "unit_id",
        "sub_unit_quantity",
        "unit_cost",
        "inventory_id"
    ];

    public function unit() : BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function inventory() : BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }
}
