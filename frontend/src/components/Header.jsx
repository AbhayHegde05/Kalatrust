import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="header-logo" onClick={closeMenu}>
          <img src={logo} alt="Saraswathi Kala Trust" className="header-logo-img" />
          <span className="header-logo-text">Saraswathi Kala Trust</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `header-nav-link ${isActive ? 'header-nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={`header-burger ${menuOpen ? 'header-burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`header-mobile-nav ${menuOpen ? 'header-mobile-nav--open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={closeMenu}
            className={({ isActive }) =>
              `header-mobile-link ${isActive ? 'header-mobile-link--active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
