<?php

namespace App\Http\Controllers;

use App\Models\dth_status_enquiries;
use Illuminate\Http\Request;

class DTHStatusEnquiryController extends Controller
{
    // Store recharge status enquiry
    public function store(Request $request)
    {
        $data = $request->validate([
            'txnid' => 'required|string',
            'operatorid' => 'required|string',
            'operatorname' => 'required|string',
            'canumber' => 'required|numeric ',
            'amount' => 'required|numeric',
            'refid' => 'required|string',
            'status' => 'required|integer',
            'comm' => 'required|numeric',
            'tds' => 'required|numeric',
            'refunded' => 'required|boolean',
            'refundtxnid' => 'nullable|string',
            'dateadded' => 'required|date',
            'daterefunded' => 'nullable|date',
        ]);

        $rechargeStatus = dth_status_enquiries::create($data);

        return response()->json(['success' => true, 'data' => $rechargeStatus], 201);
    }

    // Fetch all recharge status enquiries
    public function index()
    {
        $rechargeStatuses = dth_status_enquiries::all();
        return response()->json(['success' => true, 'data' => $rechargeStatuses], 200);
    }
}
