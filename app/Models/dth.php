<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class dth extends Model
{
    use HasFactory;

    protected $fillable = [
        'operator',
        'canumber',
        'amount',
        'referenceid',
        'message',
        'status',
        'recharge_date',
    ];
    protected $table = 'dth';

}