import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug } from '../services/api';
import './EventDetails.css';

const EventDetails = () => {
  // ... all existing logic ...
  const [event, setEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    getEventBySlug(slug)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [slug]);


  if (!event) {
    return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading event details...</p>;
  }

  const hasMedia = event.media && event.media.length > 0;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? event.media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === event.media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  // Define date formatting options
  const kannadaDateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <div className="event-detail-container">
      <header className="event-detail-header">
        <h1>{event.name}</h1>
      </header>
      
      {hasMedia && (
        <div className="carousel-container">
          <button onClick={goToPrevious} className="carousel-button prev">❮</button>
          <div className="carousel-slide-wrapper">
            {event.media.map((item, index) => (
              <div className={index === currentIndex ? 'slide active' : 'slide'} key={item._id}>
                {index === currentIndex && (
                   item.mediaType === 'image' ? (
                    <img src={item.url} alt={item.caption || event.name} />
                  ) : (
                    <video src={item.url} controls />
                  )
                )}
              </div>
            ))}
          </div>
          <button onClick={goToNext} className="carousel-button next">❯</button>
        </div>
      )}

      <div className="info-pills">
        {/* Updated line to format date in Kannada */}
        <span className="info-pill">{new Date(event.date).toLocaleDateString('kn-IN', kannadaDateOptions)}</span>
        <span className="info-pill">{event.place}</span>
      </div>

      <div className="details-grid">
        <div className="detail-card description-card">
          <h2>ಮಾಹಿತಿ</h2>
          <p>{event.description || "No description provided."}</p>
        </div>

        {event.artists && event.artists.length > 0 && (
          <div className="detail-card artists-card">
            <h2>ಕಲಾವಿದರು</h2>
            <ul>
              {event.artists.map((artist, index) => <li key={index}>{artist}</li>)}
            </ul>
          </div>
        )}
      </div>

      <footer className="event-detail-footer">
        <Link to="/events" className="btn-back">← Back to All Events</Link>
      </footer>
    </div>
  );
};

export default EventDetails;