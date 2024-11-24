<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class LequipeController extends Controller
{
    public function getArticles()
    {
        $url = 'https://api-catch-the-dev.unit41.fr/lequipe';

        $response = Http::withHeaders([
            'Authorization' => 'vQS97b12DxqeAqs15CbvSQdmBP13',
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
