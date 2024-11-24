<?php

namespace App\Http\Controllers;

use App\Services\LeMondeService;

class LeMondeController extends Controller
{
    protected $leMondeService;

    public function __construct(LeMondeService $leMondeService)
    {
        $this->leMondeService = $leMondeService;
    }

    /**
     * Affiche sous forme de vue.
     *
     * @return \Illuminate\View\View
     */
    public function showHeadlines()
    {
        $articles = $this->leMondeService->getTodayHeadlines();

        return view('lemonde.headlines', compact('articles'));
    }

    /**
     * Retourne au format JSON.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showHeadlinesJson()
    {
        $articles = $this->leMondeService->getTodayHeadlines();

        return response()->json($articles);
    }
}
