<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrepaidOperator extends Model
{
    use HasFactory;

    protected $fillable = ['operator_id', 'operator_name', 'category'];

    // Optional: Specify table name if it's not plural of model name
    protected $table = 'prepaid_operators';
}
