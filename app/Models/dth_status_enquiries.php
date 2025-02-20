<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class dth_status_enquiries extends Model
{
    use HasFactory;

    protected $fillable = [
        'txnid',
        'operatorid',
        'operatorname',
        'canumber',
        'amount',
        'refid',
        'status',
        'comm',
        'tds',
        'refunded',
        'refundtxnid',
        'dateadded',
        'daterefunded',
    ];

    protected $casts = [
        'dateadded' => 'datetime',
        'daterefunded' => 'datetime',
        'refunded' => 'boolean',
    ];
}

