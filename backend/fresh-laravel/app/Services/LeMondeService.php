<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class LeMondeService
{
    protected $apiUrl;

    public function __construct()
    {
        $this->apiUrl = 'https://api-catch-the-dev.unit41.fr/lemonde';
    }

    /**
     * Récupère les articles
     *
     * @return array
     */
    public function getTodayHeadlines(): array
	{
		$response = Http::get($this->apiUrl);

		if ($response->successful()) {
			$data = $response->json();

			// Extraire les articles depuis la clé `data`
			return $data['data'] ?? [];
		}

		\Log::error('Erreur lors de la récupération des articles : ' . $response->body());
		return [];
	}

}
