import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Articles from './components/Articles';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Articles />
            <Footer />
        </div>
    );
}

export default App;

