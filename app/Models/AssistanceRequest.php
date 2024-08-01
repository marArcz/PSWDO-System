<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssistanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'barangay_id',
        'date_recieved',
        'tracking_code',
        'status'
    ];

    public function approved(): bool
    {
        return $this->status === 'Approved';
    }

    public function approve(): void
    {
        $this->status === 'Approved';
        $this->save();
    }
}
