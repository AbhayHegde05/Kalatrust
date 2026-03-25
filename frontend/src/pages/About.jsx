import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-main">
      <div className="section-card">
        <h3>About Us</h3>
        <p>Saraswati Kala Trust began on 09-09-2022 under the leadership of Mr. Prasanna Parameshwara Hegde, with committed collaborators joining to preserve and promote Karnataka’s classical folk heritage.</p>
      </div>

      <div className="section-card">
        <h3>Our Mission</h3>
        <ul>
          <li>Promote regional and classical performing arts like Yakshagana, folk theatre, music, and drama through education and cultural outreach.</li>
          <li>Present accessible cultural programs in rural and urban neighborhoods at minimal cost.</li>
          <li>Empower future generations by teaching art forms to children and youth and nurturing cultural continuity.</li>
          <li>Open opportunities for emerging artists through festivals, workshops and mentorship programs.</li>
          <li>Honor revered masters and spotlight new talent across our artistic community.</li>
        </ul>
      </div>

      <div className="section-card">
        <h3>Our Vision</h3>
        <ul>
          <li>Integrate cultural practice with wellness: yoga, meditation and holistic living for artists and audiences.</li>
          <li>Lead eco-conscious initiatives tied to sustainability and local heritage preservation.</li>
          <li>Support vulnerable and elderly communities through art-based service and social care.</li>
          <li>Promote organic farming and village livestock traditions alongside cultural festivals.</li>
          <li>Organize workshops, training camps and collaborative events for arts and agriculture.</li>
        </ul>
      </div>

      <div className="section-card">
        <h3>ನಮ್ಮ ಸಮಿತಿ </h3>
        <div className="team-grid">
          <div className="team-member"><p>ಪ್ರಸನ್ನ ಪರಮೇಶ್ವರ ಹೆಗಡೆ</p><span>ಅಧ್ಯಕ್ಷರು</span></div>
          <div className="team-member"><p>ಗೌತಮ್ ಆರ್ ಹೆಗಡೆ</p><span>ಕಾರ್ಯದರ್ಶಿ</span></div>
          <div className="team-member"><p>ಗಣಪತಿ ವಿ ಹೆಗಡೆ</p><span>ಸದಸ್ಯ</span></div>
          <div className="team-member"><p>M P ಹೆಗಡೆ</p><span>ಸದಸ್ಯ</span></div>
          <div className="team-member"><p>ಭುವನೇಶ್ವರಿ ಹೆಗಡೆ</p><span>ಸದಸ್ಯ</span></div>
          <div className="team-member"><p>ಗಂಗಾಧರ ನಾಯ್ಕ್</p><span>ಸದಸ್ಯ</span></div>
          <div className="team-member"><p>ಪೂರುಷೋತ್ತಮ ಹೆಗಡೆ</p><span>ಸದಸ್ಯರು</span></div>
        </div>
      </div>
    </div>
  );
};

export default About;