<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrepaidOperator;
use App\Models\DTHOperator;

class OperatorController extends Controller
{
    // Method to store Prepaid operators
    public function storePrepaid(Request $request)
    {
        $operators = $request->input('operators');
        try {
            // Log the incoming operators to check if they are coming correctly
            \Log::info('Received operators:', $operators);
    
            foreach ($operators as $operator) {
                PrepaidOperator::create([
                    'operator_id' => $operator['id'],
                    'operator_name' => $operator['name'],
                    'category' => $operator['category'],
                ]);
            }
    
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            \Log::error('Error saving prepaid operators: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to save prepaid operators'], 500);
        }
    }
    

    // Method to store DTH operators
    public function storeDTH(Request $request)
    {
        $operators = $request->input('operators');

        try {
            // Loop through the DTH operators and save them
            foreach ($operators as $operator) {
                DTHOperator::create([
                    'operator_id' => $operator['id'], // operator ID
                    'operator_name' => $operator['name'], // operator Name
                    'category' => $operator['category'], // Category (DTH)
                ]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to save DTH operators']);
        }
    }
}
