import React from 'react';

const HeroSection = () => {
    return (
        <div className="hero-section bg-orange text-white py-5">
            <div className="container">
                <h1 className="display-4">Bienvenue sur votre portail de Cross Origin</h1>
                <p className="lead">
                    Découvrez les derniers articles des magasins le Monde , L'Equipe, Le Parisien et le journal Libération.
                </p>
                <a href="#articles" className="btn btn-light btn-lg mt-3">Voir les articles</a>
            </div>
        </div>
    );
};

export default HeroSection;
