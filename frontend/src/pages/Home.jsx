import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import bannerBackground from '../assets/background.png';
import { getEvents } from '../services/api';
import './Home.css';

// Simple intersection observer hook for scroll animations
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

const pillars = [
  { icon: '🎭', title: 'Yakshagana', desc: 'The dramatic dance-theatre tradition that brings ancient epics to life through vibrant costumes, music, and storytelling.' },
  { icon: '🎵', title: 'Carnatic Music', desc: 'Classical South Indian music tradition featuring intricate ragas, talas, and devotional compositions.' },
  { icon: '🌿', title: 'Folk Arts', desc: 'Rich tapestry of regional folk traditions, crafts, and performing arts that reflect local heritage.' },
];

const PillarCard = ({ icon, title, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`card text-center pillar-card ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pillar-icon animate-float">{icon}</div>
      <h3 className="text-2xl font-serif mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
};

const Home = () => {
  const [ctaRef, ctaInView] = useInView();
  const [upcomingRef, upcomingInView] = useInView();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then(res => {
        const now = new Date();
        const upcoming = res.data
          .filter(e => new Date(e.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(upcoming);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
          style={{ backgroundImage: `url(${bannerBackground})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="hero-subtitle animate-fade-in-down delay-100">
            Saraswathi Kala Trust
          </p>
          <h1 className="hero-title animate-fade-in-up delay-200">
            A Mirror to Indian Art &amp; Culture
          </h1>
          <p className="hero-desc animate-fade-in-up delay-300">
            Preserving the timeless traditions of Yakshagana, Carnatic Music, and Folk Arts for generations to come
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
            <Link to="/events" className="btn-primary">
              Explore Events
            </Link>
            <Link to="/about" className="btn-outline-cream">
              Our Story
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* Cultural Pillars */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Our Cultural Pillars</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Three pillars that form the foundation of Karnataka's living heritage
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} {...p} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 px-4 upcoming-section" ref={upcomingRef}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`section-title text-cream-title ${upcomingInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Upcoming Events
            </h2>
            <p className={`text-center mb-12 text-cream/80 ${upcomingInView ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              Don't miss these upcoming cultural performances
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => {
                const thumb = event.media?.find(m => m.mediaType === 'image');
                return (
                  <Link
                    to={`/events/${event.slug}`}
                    key={event._id}
                    className={`upcoming-event-card ${upcomingInView ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="upcoming-card-img">
                      {thumb ? (
                        <img src={thumb.url} alt={event.name} />
                      ) : (
                        <div className="upcoming-card-placeholder">🎭</div>
                      )}
                      <div className="upcoming-date-badge">
                        <span className="day">{new Date(event.date).getDate()}</span>
                        <span className="month">{new Date(event.date).toLocaleString('en-IN', { month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="upcoming-card-body">
                      <h3>{event.name}</h3>
                      <p>📍 {event.place}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link to="/events" className="btn-outline-gold">View All Events →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className="py-20 px-4 cta-section"
      >
        <div className={`max-w-4xl mx-auto text-center ${ctaInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-serif mb-6 text-cream">Join Our Cultural Journey</h2>
          <p className="text-xl mb-10 text-cream/90 leading-relaxed">
            Experience the depth of Indian classical arts through our events, workshops, and community programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn-gold">
              View Events
            </Link>
            <Link to="/contact" className="btn-outline-cream">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
