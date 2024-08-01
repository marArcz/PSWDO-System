<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Calamity extends Model
{
    use HasFactory;


    protected $fillable = [
        "name",
        "date_happened",
        "type"
    ];

    public function reports() : HasMany
    {
        return $this->hasMany(Report::class,'calamity_name','name');
    }
}
