<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Distribution extends Model
{
    use HasFactory;

    protected $with = [
        "distributionItems",
    ];

    protected $fillable = [
        "no_of_families",
        "report_id",
        'status',
        'archived',
        'municipality_name',
        'typhoon_name',
    ];

    public function distributionItems() : HasMany
    {
        return $this->hasMany(DistributionItem::class);
    }

    public function report () : BelongsTo
    {
        return $this->belongsTo(Report::class)->with(['municipality']);
    }

    public function rdsForm(): HasOne
    {
        return $this->hasOne(RdsForm::class);
    }

    protected $casts = [
        'archived' => 'boolean'
    ];

}
