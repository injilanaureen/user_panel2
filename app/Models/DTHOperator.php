<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DTHOperator extends Model
{
    use HasFactory;

    protected $fillable = ['operator_id', 'operator_name', 'category'];
    protected $table = 'dth_operators';

}
