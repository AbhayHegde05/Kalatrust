import React, { useRef, useState, useEffect } from 'react';
import './About.css';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const leadership = [
  { name: 'Prasanna Parameshwara Hegde', role: 'President' },
  { name: 'Gautam R Hegde', role: 'Secretary' },
  { name: 'Ganapati V Hegde', role: 'Member' },
  { name: 'M P Hegde', role: 'Member' },
  { name: 'Bhuvaneshwari Hegde', role: 'Member' },
  { name: 'Gangadhara Nayak', role: 'Member' },
  { name: 'Purushottama Hegde', role: 'Member' },
];

const missionItems = [
  { icon: '🎭', text: 'Promoting Yakshagana, Folk Arts, and Music for future generations' },
  { icon: '🏘️', text: 'Organizing accessible cultural programs in rural and urban areas' },
  { icon: '👶', text: 'Teaching traditional arts to children and youth' },
  { icon: '⭐', text: 'Supporting emerging artists through festivals and mentorship' },
  { icon: '🏆', text: 'Honoring master artists and recognizing new talent' },
];

const developmentItems = [
  { icon: '🧘', text: 'Integrating yoga, meditation, and wellness with cultural practice' },
  { icon: '🌱', text: 'Environmental conservation and sustainability initiatives' },
  { icon: '🤝', text: 'Supporting elderly and orphaned community members' },
  { icon: '🌾', text: 'Promoting organic farming and traditional livestock care' },
  { icon: '📚', text: 'Organizing workshops for arts and sustainable agriculture' },
];

const About = () => {
  const [missionRef, missionInView] = useInView();
  const [leaderRef, leaderInView] = useInView();

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-content">
          <p className="about-hero-tag animate-fade-in-down">Est. September 9, 2022</p>
          <h1 className="about-hero-title animate-fade-in-up delay-100">
            Saraswathi Kala Trust
          </h1>
          <p className="about-hero-desc animate-fade-in-up delay-200">
            Founded by Mr. Prasanna Parameshwara Hegde, we are dedicated to preserving and promoting India's rich cultural heritage for generations to come.
          </p>
        </div>
      </div>

      <div className="about-body">
        {/* Mission sections */}
        <section ref={missionRef} className="about-mission">
          <h2 className={`section-title ${missionInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Our Mission
          </h2>
          <div className="about-mission-grid">
            <div className={`about-mission-card ${missionInView ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              <div className="about-mission-icon">🎭</div>
              <h3>Art &amp; Culture Preservation</h3>
              <ul>
                {missionItems.map((item, i) => (
                  <li key={i}>
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`about-mission-card ${missionInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              <div className="about-mission-icon">🌿</div>
              <h3>Holistic Development</h3>
              <ul>
                {developmentItems.map((item, i) => (
                  <li key={i}>
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section ref={leaderRef} className="about-leadership">
          <h2 className={`section-title ${leaderInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Our Leadership
          </h2>
          <p className={`about-leadership-subtitle ${leaderInView ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            The dedicated individuals guiding our cultural mission
          </p>
          <div className="about-leadership-grid">
            {leadership.map((member, i) => (
              <div
                key={i}
                className={`about-member-card ${leaderInView ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="about-member-avatar">
                  {member.name.charAt(0)}
                </div>
                <h3 className="about-member-name">{member.name}</h3>
                <p className="about-member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
