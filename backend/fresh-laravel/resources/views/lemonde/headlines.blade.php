<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Une du journal Le Monde</title>
</head>
<body>
    <h1>Articles en une du journal Le Monde</h1>
    <ul>
        @forelse($articles as $article)
            <li>
                <h2>{{ $article['title'] }}</h2>
                <p><strong>Auteur :</strong> {{ $article['author'] }}</p>
                <p><strong>Date de publication :</strong> {{ $article['published_at'] }}</p>
                <p><strong>Catégorie :</strong> {{ $article['category'] }}</p>
                <p><strong>Contenu :</strong> {{ $article['content'] }}</p>
            </li>
        @empty
            <li>Aucun article disponible pour aujourd'hui.</li>
        @endforelse
    </ul>
</body>
</html>
