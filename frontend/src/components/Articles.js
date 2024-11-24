import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [search, setSearch] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [currentJournal, setCurrentJournal] = useState('lemonde');

    // Fonction pour normaliser les données
    const normalizeArticles = (data, journal) => {
        if (journal === 'leparisien') {
            return data.map((article) => ({
                id: article.id,
                title: article.headlines.basic,
                content: article.content,
                category: article.keywords.join(', '),
                author: article.credits
                    .filter((credit) => credit.type === 'author')
                    .map((credit) => credit.name)
                    .join(', ') || 'Inconnu',
                published_at: new Date(article.publish_date * 1000), // Convertir le timestamp
            }));
        } else if (journal === 'lemonde') {
            // Supposons que Le Monde retourne déjà la structure correcte
            return data.map((article) => ({
                id: article.id,
                title: article.title,
                content: article.content,
                category: article.category,
                author: article.author || 'Inconnu',
                published_at: new Date(article.published_at), // Date au format ISO
            }));
        }
        return [];
    };

    // Valide les articles pour vérifier qu'ils ont tous les champs nécessaires
    const isValidArticle = (article) => {
        return (
            article &&
            typeof article.title === 'string' &&
            typeof article.content === 'string' &&
            typeof article.category === 'string' &&
            article.published_at instanceof Date
        );
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const url =
                    currentJournal === 'lemonde'
                        ? 'http://localhost/api/lemonde'
                        : 'http://localhost/api/leparisien';
                const response = await axios.get(url, {
                    headers: currentJournal === 'leparisien'
                        ? {
                              Authorization: 'ApiToken o8L1WFtdEzBjlq7ro9uf6squ05QWKh2AbMsNYcaM8L',
                          }
                        : {},
                });

                const normalizedData = normalizeArticles(
                    response.data.data || response.data, // Accéder à la clé `data` si elle existe
                    currentJournal
                );
				const sortedById = [...normalizedData].sort((a, b) => a.id - b.id);
                setArticles(sortedById);
                setFilteredArticles(sortedById);
            } catch (error) {
                console.error(`Erreur lors de la récupération des articles de ${currentJournal} :`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [currentJournal]);

    useEffect(() => {
        const sanitizedSearch = search.toLowerCase();
        let updatedArticles = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(sanitizedSearch) ||
                article.content.toLowerCase().includes(sanitizedSearch) ||
                article.category.toLowerCase().includes(sanitizedSearch) ||
                article.author.toLowerCase().includes(sanitizedSearch)
        );

        if (sortCriteria) {
            updatedArticles = [...updatedArticles].sort((a, b) => {
                let comparison = 0;

                if (sortCriteria === 'date') {
                    comparison = a.published_at - b.published_at;
                } else if (sortCriteria === 'category') {
                    comparison = a.category.localeCompare(b.category);
                } else if (sortCriteria === 'title') {
                    comparison = a.title.localeCompare(b.title);
                }

                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        setFilteredArticles(updatedArticles);
    }, [search, sortCriteria, sortOrder, articles]);

    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const handleSelectArticle = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseFocus = () => {
        setSelectedArticle(null);
    };

    if (loading) {
        return <p className="text-center py-5">Chargement des articles...</p>;
    }

    return (
        <div id="articles" className="container py-5">
            <h2 className="text-orange mb-4">Derniers Articles</h2>

            {/* Boutons pour changer de journal */}
            <div className="mb-4">
                <button
                    className={`btn btn-${currentJournal === 'lemonde' ? 'orange' : 'outline-orange'} me-2`}
                    onClick={() => setCurrentJournal('lemonde')}
                >
                    Articles Le Monde
                </button>
                <button
                    className={`btn btn-${currentJournal === 'leparisien' ? 'orange' : 'outline-orange'} me-2`}
                    onClick={() => setCurrentJournal('leparisien')}
                >
                    Articles Le Parisien
                </button>
            </div>

            {/* Barre de recherche et tri */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un article..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <button
                        className={`btn btn-outline-orange me-2 ${
                            sortCriteria === 'date' ? 'active' : ''
                        }`}
                        onClick={() => handleSort('date')}
                    >
                        Date {sortCriteria === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button
                        className={`btn btn-outline-orange me-2 ${
                            sortCriteria === 'category' ? 'active' : ''
                        }`}
                        onClick={() => handleSort('category')}
                    >
                        Catégorie {sortCriteria === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button
                        className={`btn btn-outline-orange ${
                            sortCriteria === 'title' ? 'active' : ''
                        }`}
                        onClick={() => handleSort('title')}
                    >
                        Titre {sortCriteria === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                </div>
            </div>

            {/* Mode focus sur un article */}
            {selectedArticle && (
                <div className="focus-overlay" onClick={handleCloseFocus}>
                    <div className="focus-article">
                        <h3 className="text-orange">{selectedArticle.title}</h3>
                        <p className="text-muted">
                            Publié le : {selectedArticle.published_at.toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Auteur(s) :</strong> {selectedArticle.author}
                        </p>
                        <p>
                            <strong>Catégorie :</strong> {selectedArticle.category}
                        </p>
                        <p className="mt-4">{selectedArticle.content}</p>
                        <button className="btn btn-outline-orange mt-3" onClick={handleCloseFocus}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* Grille des articles */}
            <div className={`row ${selectedArticle ? 'blur-background' : ''}`}>
                {filteredArticles.length > 0 ? (
                    filteredArticles
                        .filter(isValidArticle)
                        .map((article) => (
                            <div
                                key={article.id}
                                className="col-md-4 mb-4"
                                onClick={() => handleSelectArticle(article)}
                            >
                                <div className="card h-100 shadow-sm article-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-orange">{article.title}</h5>
                                        <p className="card-text">{article.content.substring(0, 100)}...</p>
                                        <p className="text-muted">
                                            <small>
                                                Publié le :{' '}
                                                {article.published_at.toLocaleDateString()}
                                            </small>
                                        </p>
                                        <span className="badge bg-orange">{article.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-center">Aucun article trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default Articles;
