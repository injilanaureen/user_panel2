<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recharge;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RechargeController extends Controller
{
    private $headers = [
        'Authorisedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
        'Token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3Mzk4NjE1NjEsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzM5ODYxNTYxIn0.f1KVsIMsxbfaei6iA5zpoOc0g8FF_uu16hmeyRm4_LQ',
        'accept' => 'text/plain',
        'content-type' => 'application/json'
    ];

    // Fetch operators from the external API
    public function fetchOperators(Request $request)
    {
        try {
            $response = Http::withHeaders($this->headers)
                ->post('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/getoperator');

            $data = $response->json();

            if ($data && isset($data['data'])) {
                $prepaidOperators = array_filter($data['data'], fn($operator) => $operator['category'] === 'Prepaid');
                return response()->json([
                    'success' => true,
                    'operators' => array_values($prepaidOperators) // Reindex array
                ]);
            }

            return response()->json(['success' => false, 'message' => $data['message'] ?? 'No data available'], 400);
        } catch (\Exception $e) {
            Log::error('Error fetching operators: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to fetch operators'], 500);
        }
    }

    // Perform recharge
    public function doRecharge(Request $request)
    {
        $data = $request->validate([
            'operator' => 'required|string',
            'canumber' => 'required|string',
            'amount' => 'required|numeric',
            'referenceid' => 'nullable|string',
        ]);

        try {
            $response = Http::withHeaders($this->headers)
                ->post('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/dorecharge', $data);

            $result = $response->json();

            if ($result['status']) {
                Recharge::create([
                    'operator' => $data['operator'],
                    'canumber' => $data['canumber'],
                    'amount' => $data['amount'],
                    'referenceid' => $data['referenceid'] ?? null,
                    'message' => $result['message'],
                    'status' => $result['status'],
                    'recharge_date' => now(),
                ]);
            }

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Error performing recharge: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Recharge failed'], 500);
        }
    }

    // Check recharge status
    public function checkStatus(Request $request)
    {
        $data = $request->validate([
            'referenceid' => 'required|string',
        ]);

        try {
            $response = Http::withHeaders($this->headers)
                ->post('https://sit.paysprint.in/service-api/api/v1/service/recharge/recharge/status', $data);

            $result = $response->json();

            if ($result['status']) {
                // Optionally save status to the database
                // Adjust the structure based on your needs
                Recharge::updateOrCreate(
                    ['referenceid' => $data['referenceid']],
                    [
                        'operator' => $result['data']['operatorname'] ?? null,
                        'canumber' => $result['data']['canumber'] ?? null,
                        'amount' => $result['data']['amount'] ?? null,
                        'message' => $result['message'],
                        'status' => $result['data']['status'] === '1',
                        'recharge_date' => $result['data']['dateadded'] ?? now(),
                    ]
                );
            }

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Error checking status: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Status check failed'], 500);
        }
    }

    // Existing store method (if still needed)
    public function store(Request $request)
    {
        // Keep this as is or refactor based on your needs
        $data = $request->validate([
            'recharge_data.form_data.operator' => 'required|string',
            'recharge_data.form_data.canumber' => 'required|string',
            'recharge_data.form_data.amount' => 'required|numeric',
            'recharge_data.form_data.referenceid' => 'nullable|string',
            'recharge_data.message' => 'required|string',
            'recharge_data.status' => 'required|boolean',
            'recharge_data.recharge_date' => 'nullable|date',
        ]);

        try {
            Recharge::create([
                'operator' => $data['recharge_data']['form_data']['operator'],
                'canumber' => $data['recharge_data']['form_data']['canumber'],
                'amount' => $data['recharge_data']['form_data']['amount'],
                'referenceid' => $data['recharge_data']['form_data']['referenceid'] ?? null,
                'message' => $data['recharge_data']['message'],
                'status' => $data['recharge_data']['status'],
                'recharge_date' => $data['recharge_data']['recharge_date'] ?? now(),
            ]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error saving recharge details: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to save recharge details'], 500);
        }
    }
}