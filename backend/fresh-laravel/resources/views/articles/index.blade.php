<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Articles</title>
</head>
<body>
    <h1>Liste des Articles</h1>
    <ul>
        @foreach($articles as $article)
            <li>
                <h2>{{ $article->title }}</h2>
                <p><strong>Auteur :</strong> {{ $article->author }}</p>
                <p><strong>Date de publication :</strong> {{ $article->publication_date }}</p>
                <p><strong>Catégorie :</strong> {{ $article->category->name ?? $article->category }}</p>
                <p><strong>Source :</strong> {{ $article->source->name ?? $article->source }}</p>
                <p><strong>Contenu :</strong> {{ $article->content }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
