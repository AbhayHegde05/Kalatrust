import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';
import './Events.css';

function useInView(threshold = 0.1) {
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

const EventCard = ({ event, index, isUpcoming }) => {
  const [ref, inView] = useInView();
  const thumbnail = event.media?.find(item => item.mediaType === 'image');
  const dateObj = new Date(event.date);

  return (
    <Link
      ref={ref}
      to={`/events/${event.slug}`}
      className={`event-card-link ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${(index % 3) * 120}ms` }}
    >
      <div className={`event-card ${isUpcoming ? 'event-card--upcoming' : ''}`}>
        {isUpcoming && <div className="upcoming-ribbon">Upcoming</div>}
        <div className="event-card-img-wrap">
          {thumbnail ? (
            <img src={thumbnail.url} alt={event.name} className="event-card-img" />
          ) : (
            <div className="event-card-placeholder">🎭</div>
          )}
          <div className="event-card-date-overlay">
            <span className="date-day">{dateObj.getDate()}</span>
            <span className="date-month">{dateObj.toLocaleString('en-IN', { month: 'short' })}</span>
            <span className="date-year">{dateObj.getFullYear()}</span>
          </div>
        </div>
        <div className="event-card-body">
          <h3 className="event-card-title">{event.name}</h3>
          <div className="event-card-meta">
            <span>📍 {event.place}</span>
          </div>
          <span className="event-card-cta">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

const SectionHeader = ({ title, subtitle }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`events-section-header ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="events-section-subtitle">{subtitle}</p>}
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="events-loading">
        <div className="events-spinner" />
        <p>Loading events...</p>
      </div>
    );
  }

  const now = new Date();
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastEvents = events
    .filter(e => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="events-page">
      {/* Page Hero */}
      <div className="events-hero">
        <div className="events-hero-content">
          <h1 className="events-hero-title animate-fade-in-down">Cultural Events</h1>
          <p className="events-hero-subtitle animate-fade-in-up delay-200">
            Experience the richness of Indian performing arts through our curated events and performances.
          </p>
          <div className="events-hero-stats animate-fade-in-up delay-300">
            <div className="stat-pill">
              <span className="stat-num">{upcomingEvents.length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">{pastEvents.length}</span>
              <span className="stat-label">Past Events</span>
            </div>
          </div>
        </div>
      </div>

      <div className="events-content">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="events-section upcoming-events-section">
            <SectionHeader
              title="Upcoming Events"
              subtitle="Mark your calendar — these performances are coming soon"
            />
            <div className="events-grid">
              {upcomingEvents.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} isUpcoming />
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="events-section past-events-section">
            <SectionHeader
              title="Past Events"
              subtitle="Relive the magic of our previous cultural performances"
            />
            <div className="events-grid">
              {pastEvents.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} isUpcoming={false} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {events.length === 0 && (
          <div className="events-empty">
            <div className="events-empty-icon animate-float">🎭</div>
            <h3>No Events Available</h3>
            <p>Check back soon for upcoming cultural performances.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
