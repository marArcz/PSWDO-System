<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Report extends Model
{
    use HasFactory;

    protected $with = ['calamity','distribution'];
    protected $fillable = [
        "calamity_name",
        "calamity",
        "municipality_name",
        "municipality",
        'typhoon_level',
        'lce_present',
        'no_of_barangay',
        'no_of_punong_barangay_present',
        'remarks',
        'no_of_families',
        'no_of_barangay_covered',
        'no_of_evacuation',
        'no_of_families_served',
        'no_of_barangay_conducted_evacuation',
        'power_supply_status',
        'water_supply_status',
        'roads_and_bridges_status',
        'total_served',
        'total_barangay_served',
        'telecommunication_status',
        'status'
    ];

    public function municipality():BelongsTo{
        return $this->belongsTo(Municipality::class,'municipality_name','name');
    }
    public function calamity():BelongsTo{
        return $this->belongsTo(Calamity::class,'calamity_name','name');
    }

    public function distribution(): HasOne{
        return $this->hasOne(Distribution::class)->where('status','!=','Declined');
    }
    public function currentDistribution(): HasOne{
        return $this->hasOne(Distribution::class);
    }
}
