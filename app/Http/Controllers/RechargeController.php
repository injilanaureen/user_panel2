<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recharge;

class RechargeController extends Controller
{
    public function store(Request $request)
{
    $data = $request->validate([
        'recharge_data.form_data.operator'      => 'required|string',
        'recharge_data.form_data.canumber'      => 'required|string',
        'recharge_data.form_data.amount'        => 'required|numeric',
        'recharge_data.form_data.referenceid'   => 'nullable|string',
        'recharge_data.message'                 => 'required|string',
        'recharge_data.status'                  => 'required|boolean',
        'recharge_data.recharge_date'           => 'nullable|date',
    ]);

    try {
        Recharge::create([
            'operator'    => $data['recharge_data']['form_data']['operator'],
            'canumber'    => $data['recharge_data']['form_data']['canumber'],
            'amount'      => $data['recharge_data']['form_data']['amount'],
            'referenceid' => $data['recharge_data']['form_data']['referenceid'] ?? null,
            'message'     => $data['recharge_data']['message'],
            'status'      => $data['recharge_data']['status'],
            'recharge_date' => $data['recharge_data']['recharge_date'] ?? now(),
        ]);

        return response()->json(['success' => true]);
    } catch (\Exception $e) {
        \Log::error('Error saving recharge details: ' . $e->getMessage());
        return response()->json(['success' => false, 'message' => 'Failed to save recharge details'], 500);
    }
}

}
