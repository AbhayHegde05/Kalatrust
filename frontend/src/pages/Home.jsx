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
          <h1>ಭಾರತೀಯ ಕಲೆ, ಸಂಸ್ಕೃತಿಯ ಕೈಗನ್ನಡಿ</h1>
          <Link to="/events" className="btn-discover">ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ವೀಕ್ಷಿಸಿ</Link>
        </div>
      </section>

      <section className="cards-section">
        <div className="card">
          <h2>🎨 ಕಲೆ </h2>
          <p className="info">ಸನಾತನ ಕಲೆಗಳಿಗೆ ನಮ್ಮ ಬೆಂಬಲ</p>
        </div>
        <div className="card">
          <h2>♭ ಸಂಗೀತ </h2>
          <p className="info">ಶುದ್ಧ ಸಂಗೀತದೆಡೆಗೆ ನಮ್ಮ ಉತ್ಸಾಹ</p>
        </div>
        <div className="card">
          <h2>🕉️ ಸಂಸ್ಕೃತಿ</h2>
          <p className="info">ಸನಾತನ ಸಂಸ್ಕೃತಿಗೆ ಅಗ್ರಸ್ಥಾನ</p>
        </div>
      </section>
    </div>
  );
};

export default Home;