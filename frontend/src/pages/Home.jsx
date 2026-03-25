import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bannerBackground from '../assets/background.png';

const Home = () => {
  return (
    <div className="home-container">
      <section className="banner" style={{ backgroundImage: `url(${bannerBackground})` }}></section>
      
      <section className="hero">
        <div className="hero-content">
          <h1>Yakshagana: The Living Drama of Karnataka</h1>
          <p className="hero-subtitle">Discover the vibrant beats of culture, art and music through traditional and new-age expression.</p>
          <Link to="/events" className="btn-discover">Explore Events & Performances</Link>
        </div>
      </section>

      <section className="cards-section">
        <div className="card">
          <h2>🎭 Yakshagana</h2>
          <p className="info">A dramatic spectacle with texture, rhythm, and mythic stories.</p>
        </div>
        <div className="card">
          <h2>🎶 Folk & Music</h2>
          <p className="info">Rooted melodies and dynamic rhythms from Karnataka’s rich tradition.</p>
        </div>
        <div className="card">
          <h2>🌿 Culture</h2>
          <p className="info">Sustaining heritage with learning for the next generation.</p>
        </div>
      </section>

      <section className="yakshagana-highlight">
        <div className="yakshagana-content">
          <h2>Yakshagana Spotlight</h2>
          <p>Yakshagana is the heart of our mission — an epic narrative art combining dance, music, dialogue and vibrant costumes. We champion new productions, school training programs, and intergenerational performances.</p>
          <Link to="/about" className="btn-discover" style={{ marginTop: '1rem' }}>Learn More About Our Yakshagana Initiatives</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;