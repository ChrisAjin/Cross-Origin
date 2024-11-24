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

    // Sanitize input to prevent injection attacks
    const sanitizeInput = (input) => {
        const div = document.createElement('div');
        div.innerText = input;
        return div.innerHTML;
    };

    // Validate article fields
    const isValidArticle = (article) => {
        return (
            typeof article.title === 'string' &&
            typeof article.content === 'string' &&
            typeof article.category === 'string' &&
            !isNaN(new Date(article.published_at))
        );
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const url =
                    currentJournal === 'lemonde'
                        ? 'http://localhost/api/lemonde'
                        : 'http://localhost/api/lequipe';
                const response = await axios.get(url, {
                    headers: currentJournal === 'lequipe'
                        ? {
                              Authorization: 'vQS97b12DxqeAqs15CbvSQdmBP13',
                          }
                        : {},
                });
                setArticles(response.data);
                setFilteredArticles(response.data);
            } catch (error) {
                console.error(`Erreur lors de la récupération des articles de ${currentJournal} :`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [currentJournal]);

    useEffect(() => {
        const sanitizedSearch = sanitizeInput(search);

        let updatedArticles = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(sanitizedSearch.toLowerCase()) ||
                article.content.toLowerCase().includes(sanitizedSearch.toLowerCase()) ||
				article.category.toLowerCase().includes(sanitizedSearch.toLowerCase()) ||
				article.author.toLowerCase().includes(sanitizedSearch.toLowerCase())
        );

        if (sortCriteria) {
            updatedArticles = [...updatedArticles].sort((a, b) => {
                let comparison = 0;

                if (sortCriteria === 'date') {
                    comparison = new Date(a.published_at) - new Date(b.published_at);
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
                    className={`btn btn-${currentJournal === 'lequipe' ? 'orange' : 'outline-orange'} me-2`}
                    onClick={() => setCurrentJournal('lequipe')}
                >
                    Articles L'Équipe
                </button>
            </div>

            {/* Barre de recherche et tri */}
            <div className="row mb-4 align-items-center">
                {/* Barre de recherche */}
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un article..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Boutons de tri */}
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
                            Publié le : {new Date(selectedArticle.published_at).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Auteur :</strong> {selectedArticle.author}
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
                                        <p className="card-text">
                                            {article.content.substring(0, 100)}...
                                        </p>
                                        <p className="text-muted">
                                            <small>
                                                Publié le :{' '}
                                                {new Date(article.published_at).toLocaleDateString()}
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
