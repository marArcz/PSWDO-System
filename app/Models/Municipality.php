<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Municipality extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        "population",
        "families",
        "households"
    ];
    protected $with = [
        'barangays',
    ];

    public function admin():HasOne
    {
        return $this->hasOne(LguAdmin::class);
    }

    public function barangays():HasMany
    {
        return $this->hasMany(Barangay::class);
    }

    public function reports(): HasMany{
        return $this->hasMany(Report::class,'municipality_name','name');
    }

}
