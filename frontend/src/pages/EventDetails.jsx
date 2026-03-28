import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug, submitReview } from '../services/api';
import './EventDetails.css';

/* ── Auto-scrolling horizontal strip ── */
const AutoScroll = ({ items, renderItem, speed = 35 }) => {
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const step = () => {
      posRef.current -= speed / 60;
      const half = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);

    const pause  = () => cancelAnimationFrame(animRef.current);
    const resume = () => { animRef.current = requestAnimationFrame(step); };
    track.parentElement.addEventListener('mouseenter', pause);
    track.parentElement.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.parentElement?.removeEventListener('mouseenter', pause);
      track.parentElement?.removeEventListener('mouseleave', resume);
    };
  }, [items, speed]);

  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div className="autoscroll-viewport">
      <div className="autoscroll-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <div className="autoscroll-item" key={i}>{renderItem(item, i)}</div>
        ))}
      </div>
    </div>
  );
};

/* ── Star rating display ── */
const Stars = ({ value, interactive = false, onChange }) => (
  <div className="stars">
    {[1,2,3,4,5].map(n => (
      <button
        key={n}
        type={interactive ? 'button' : undefined}
        className={`star ${n <= value ? 'star--filled' : ''} ${interactive ? 'star--interactive' : ''}`}
        onClick={interactive ? () => onChange(n) : undefined}
        aria-label={`${n} star`}
      >★</button>
    ))}
  </div>
);

/* ── Review form ── */
const ReviewForm = ({ slug, onSubmitted }) => {
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.rating) { setErr('Please select a star rating.'); return; }
    setSubmitting(true); setErr('');
    try {
      const res = await submitReview(slug, form);
      onSubmitted(res.data);
      setDone(true);
    } catch {
      setErr('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return (
    <div className="review-thanks">
      <span className="review-thanks-icon">🙏</span>
      <p>Thank you for your review!</p>
    </div>
  );

  return (
    <form className="review-form" onSubmit={submit}>
      <h3>Share Your Experience</h3>
      {err && <p className="review-err">{err}</p>}
      <div className="review-form-row">
        <div className="review-form-group">
          <label>Your Name</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="e.g. Ramesh Hegde" />
        </div>
        <div className="review-form-group">
          <label>Rating</label>
          <Stars value={form.rating} interactive onChange={r => setForm(f => ({ ...f, rating: r }))} />
        </div>
      </div>
      <div className="review-form-group">
        <label>Your Review</label>
        <textarea name="comment" value={form.comment} onChange={handle} required rows={4} placeholder="Tell us about your experience..." />
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
};

/* ── Main component ── */
const EventDetails = () => {
  const [event, setEvent]   = useState(null);
  const [reviews, setReviews] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    getEventBySlug(slug)
      .then(res => {
        setEvent(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (!event) return (
    <div className="event-detail-loading">
      <div className="event-detail-spinner" />
      <p>Loading event…</p>
    </div>
  );

  const images = (event.media || []).filter(m => m.mediaType === 'image');
  const videos = (event.media || []).filter(m => m.mediaType === 'video');
  const isPast = new Date(event.date) < new Date();
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="event-detail-page">
      {/* ── Hero ── */}
      <div className="event-detail-hero">
        <div className="event-detail-hero-content">
          <span className={`event-status-badge ${isPast ? 'badge--past' : 'badge--upcoming'}`}>
            {isPast ? 'Past Event' : 'Upcoming'}
          </span>
          <h1 className="event-detail-title animate-fade-in-down">{event.name}</h1>
          <div className="event-detail-pills animate-fade-in-up delay-200">
            <span className="event-pill pill--date">
              📅 {new Date(event.date).toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            </span>
            <span className="event-pill pill--place">📍 {event.place}</span>
            {avgRating && (
              <span className="event-pill pill--rating">⭐ {avgRating} / 5 ({reviews.length} reviews)</span>
            )}
          </div>
        </div>
      </div>

      <div className="event-detail-body">
        {/* ── Photo Strip ── */}
        {images.length > 0 && (
          <section className="media-section">
            <h2 className="media-section-title">
              <span>📸</span> Photo Gallery
            </h2>
            <AutoScroll
              items={images}
              speed={40}
              renderItem={(img) => (
                <img src={img.url} alt={img.caption || event.name} className="autoscroll-photo" />
              )}
            />
          </section>
        )}

        {/* ── Videos ── */}
        {videos.length > 0 && (
          <section className="media-section">
            <h2 className="media-section-title">
              <span>🎬</span> Event Videos
            </h2>
            <div className="videos-grid">
              {videos.map(v => (
                <div key={v._id} className="video-card">
                  <video src={v.url} controls className="video-player" />
                  {v.caption && <p className="video-caption">{v.caption}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Details ── */}
        <div className={`event-details-grid ${event.artists?.length ? 'has-artists' : ''}`}>
          <div className="event-info-card animate-fade-in-up delay-100">
            <h2>Event Overview</h2>
            <p>{event.description || 'No description provided.'}</p>
          </div>
          {event.artists?.length > 0 && (
            <div className="event-artists-card animate-fade-in-up delay-200">
              <h2>Featured Artists</h2>
              <ul>
                {event.artists.map((a, i) => (
                  <li key={i}><span className="artist-icon">🎭</span>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Reviews ── */}
        <section className="reviews-section">
          <h2 className="section-title">Audience Reviews</h2>

          {reviews.length > 0 && (
            <div className="reviews-list">
              {reviews.map(r => (
                <div key={r._id} className="review-card animate-fade-in-up">
                  <div className="review-card-top">
                    <div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <p className="review-name">{r.name}</p>
                      <Stars value={r.rating} />
                    </div>
                    <span className="review-date">
                      {new Date(r.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                    </span>
                  </div>
                  <p className="review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          <ReviewForm slug={slug} onSubmitted={r => setReviews(prev => [r, ...prev])} />
        </section>

        {/* ── Back ── */}
        <div className="event-detail-footer animate-fade-in-up delay-300">
          <Link to="/events" className="btn-back-events">← Back to All Events</Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
