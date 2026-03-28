import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const socialLinks = [
  {
    href: 'https://facebook.com/saraswathikalatrust',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/saraswathikalatrust',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://youtube.com/@saraswathikalatrust',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a0d00"/>
      </svg>
    ),
  },
  {
    href: 'https://wa.me/919876543210',
    label: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.36-.24-.38A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Main footer grid */}
      <div className="footer-main">
        <div className="footer-inner">
          {/* Brand column */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand">
              <span className="footer-brand-icon">🎭</span>
              <span className="footer-brand-name">Saraswathi Kala Trust</span>
            </div>
            <p className="footer-tagline">
              A Mirror to Indian Art &amp; Culture — preserving Karnataka's living heritage through Yakshagana, Carnatic music, and folk arts.
            </p>
            <div className="footer-social">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">📧</span>
                <a href="mailto:abhayhegde.05@gmail.com">abhayhegde.05@gmail.com</a>
              </li>
              <li>
                <span className="footer-contact-icon">📞</span>
                <a href="tel:+918792117628">+91 87921 17628</a>
              </li>
              <li>
                <span className="footer-contact-icon">📍</span>
                <span>Karnataka, India</span>
              </li>
              <li>
                <span className="footer-contact-icon">🕐</span>
                <span>Mon – Sat: 9 AM – 6 PM IST</span>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Organisation</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">🏛️</span>
                <span>Reg. Trust — Karnataka</span>
              </li>
              <li>
                <span className="footer-contact-icon">📅</span>
                <span>Founded: September 9, 2022</span>
              </li>
              <li>
                <span className="footer-contact-icon">🎗️</span>
                <span>Non-profit Cultural Organisation</span>
              </li>
              <li>
                <span className="footer-contact-icon">🌐</span>
                <a href="https://kalatrust.vercel.app" target="_blank" rel="noopener noreferrer">kalatrust.vercel.app</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            &copy; {year} Saraswathi Kala Trust. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span className="footer-legal-sep">·</span>
            <a href="/terms">Terms of Use</a>
            <span className="footer-legal-sep">·</span>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
          <p className="footer-made-with">
            Made with ❤️ for Karnataka's cultural heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
