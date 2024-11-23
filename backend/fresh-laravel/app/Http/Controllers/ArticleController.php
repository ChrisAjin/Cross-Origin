<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
	{
		// Recup Articles
		$articles = \App\Models\Article::with('category', 'source')->get();

		// retourner une vue avec les articles
		return view('articles.index', compact('articles'));
	}
	public function indexJson()
	{
		// Récupérer tous les articles avec leurs relations éventuelles
		$articles = \App\Models\Article::with('category', 'source')->get();

		// Retourner les articles sous forme de JSON
		return response()->json($articles);
	}


}
