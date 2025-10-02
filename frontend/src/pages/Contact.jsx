import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-card">
          <h3>ಪ್ರಸನ್ನ ಪರಮೇಶ್ವರ ಹೆಗಡೆ</h3>
          <p>ಅಧ್ಯಕ್ಷರು</p>
          <p>Phone: <a href="tel:+919999999999">+91 99999 99999</a></p>
        </div>
        <div className="contact-card">
          <h3>ಗೌತಮ್ ಆರ್ ಹೆಗಡೆ</h3>
          <p>ಕಾರ್ಯದರ್ಶಿ</p>
          <p>Phone: <a href="tel:+918888888888">+91 88888 88888</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;