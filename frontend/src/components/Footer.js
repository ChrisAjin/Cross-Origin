import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="text-orange">Orange</h5>
                        <p>Votre opérateur de confiance pour tous vos services télécoms.</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <a href="#articles" className="text-white me-3">Articles</a>
                        <a href="#contact" className="text-white">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
