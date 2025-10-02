import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="app-header">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Saraswati Kala Trust Logo" className="logo-img" />
        <span>ಸರಸ್ವತಿ ಕಲಾ ಟ್ರಸ್ಟ್</span>
      </NavLink>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </div>
      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li><NavLink to="/" onClick={closeMenu}>ಹೋಮ್</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>ನಮ್ಮ ಬಗ್ಗೆ</NavLink></li>
          <li><NavLink to="/events" onClick={closeMenu}>ಕಾರ್ಯಕ್ರಮಗಳು</NavLink></li>
          <li><NavLink to="/gallery" onClick={closeMenu}>ಚಿತ್ರಭಂಢಾರ</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>ಸಂಪರ್ಕಿಸಿ</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;