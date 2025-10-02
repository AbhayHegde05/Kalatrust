import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Saraswati Kala Trust. All rights reserved.</p>
    </footer>
  );
};

export default Footer;