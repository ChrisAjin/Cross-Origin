<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class LeParisienController extends Controller
{
    public function getArticles()
    {
        $url = 'https://api-catch-the-dev.unit41.fr/leparisien';

        $response = Http::withHeaders([
            'Authorization' => 'ApiToken o8L1WFtdEzBjlq7ro9uf6squ05QWKh2AbMsNYcaM8L',
        ])->get($url);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'message' => 'Erreur lors de la récupération des articles',
            'details' => $response->body(),
        ], $response->status());
    }
}
