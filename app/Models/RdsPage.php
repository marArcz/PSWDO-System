<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RdsPage extends Model
{
    use HasFactory;

    protected $fillable = [
        "url",
        "rds_form_id"
    ];
}
