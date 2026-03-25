import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-deep-terracotta text-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">Saraswathi Kala Trust</h3>
            <p className="text-cream/80 mb-4 max-w-md">
              Preserving Karnataka's rich cultural heritage through Yakshagana, Carnatic music, and folk arts for future generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold hover:text-cream transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-gold hover:text-cream transition-colors">
                📷 Instagram
              </a>
              <a href="#" className="text-gold hover:text-cream transition-colors">
                🎵 YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-cream/80 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-cream/80 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/events" className="text-cream/80 hover:text-gold transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="text-cream/80 hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-cream/80 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-cream/80">
              <p>📧 info@saraswathikalatrust.org</p>
              <p>📍 Karnataka, India</p>
              <p>🎭 Founded: September 9, 2022</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/30 mt-8 pt-8 text-center">
          <p className="text-cream/60">
            &copy; {new Date().getFullYear()} Saraswathi Kala Trust. All rights reserved.
            <span className="block mt-2 text-sm">
              Made with ❤️ for Karnataka's cultural heritage
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;