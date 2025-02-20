<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class FinoController extends Controller
{
    public function generate()
    {
        return Inertia::render('User/cms/finocms'); // Renders the React component
    }

    public function process(Request $request)
    {
        $data = $request->validate([
            'transaction_id' => 'required|integer',
            'redirect_url' => 'required|url',
        ]);

        // Call external API
        $apiResponse = Http::withHeaders([
            'Authorizedkey' => 'Y2RkZTc2ZmNjODgxODljMjkyN2ViOTlhM2FiZmYyM2I=',
            'token' => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDAwMjk5NjEsInBhcnRuZXJJZCI6IlBTMDAxNTY4IiwicmVxaWQiOiIxNzQwMDI5OTYxIn0.FinP5ONFH5_lPJ6wPlHsYN1EjEsI1RuXM0IqlGvokHU',
            'accept' => 'text/plain',
            'content-type' => 'application/json',
        ])->post('https://sit.paysprint.in/service-api/api/v1/service/finocms/fino/generate_url', $data);

        return redirect()->route('fino')->with('apiResponse', $apiResponse->json()); // Send response to React
    }
}

