import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const leadership = [
  { name: 'Prasanna Parameshwara Hegde', role: 'President',  phone: '+91 94807 46537' },
  { name: 'Gautam R Hegde',              role: 'Secretary',  phone: '+91 94812 84793' },
];

const Contact = () => (
  <div className="contact-page">
    {/* Hero */}
    <div className="contact-hero">
      <h1>Contact Us</h1>
      <p>Reach out to our team or support our cultural mission.</p>
    </div>

    <div className="contact-body">
      <div className="contact-grid">

        {/* Leadership */}
        <div className="contact-card">
          <h2>Leadership Team</h2>
          <div className="contact-members">
            {leadership.map((m, i) => (
              <div key={i} className="contact-member">
                <div className="contact-avatar">{m.name.charAt(0)}</div>
                <div className="contact-member-info">
                  <p className="contact-member-name">{m.name}</p>
                  <p className="contact-member-role">{m.role}</p>
                  <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="contact-phone">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {m.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-email-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:abhayhegde.05@gmail.com">abhayhegde.05@gmail.com</a>
          </div>

          <div className="contact-email-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href="tel:+918792117628">+91 87921 17628</a>
          </div>
        </div>

        {/* Donate */}
        <div className="contact-card">
          <h2>Support Our Mission</h2>
          <div className="contact-bank">
            <p className="contact-bank-label">Bank Transfer Details</p>
            <div className="contact-bank-rows">
              <div className="contact-bank-row">
                <span>Bank Name</span>
                <span>[Bank Name]</span>
              </div>
              <div className="contact-bank-row">
                <span>Account Number</span>
                <span>[Account Number]</span>
              </div>
              <div className="contact-bank-row">
                <span>IFSC Code</span>
                <span>[IFSC Code]</span>
              </div>
              <div className="contact-bank-row">
                <span>Account Holder</span>
                <span>Saraswathi Kala Trust</span>
              </div>
            </div>
            <p className="contact-bank-note">
              Your generous donations help preserve Karnataka's rich cultural heritage and support upcoming generations of artists.
            </p>
          </div>
        </div>
      </div>

      {/* Get Involved */}
      <div className="contact-cta">
        <h2>Get Involved</h2>
        <p>
          Whether you're an artist, patron, or cultural enthusiast, we welcome your participation in our mission to preserve and promote traditional arts.
        </p>
        <div className="contact-cta-btns">
          <a href="mailto:abhayhegde.05@gmail.com" className="contact-btn-primary">
            Send us an Email
          </a>
          <Link to="/events" className="contact-btn-outline">
            Join Our Events
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
