<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RdsForm extends Model
{
    use HasFactory;

    protected $with = [
        'rdsPages'
    ];

    protected $fillable = [
        "pdf",
        "distribution_id"
    ];

    public function rdsPages(): HasMany
    {
        return $this->hasMany(RdsPage::class);
    }
}
