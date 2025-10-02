import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';
import Loader from '../components/Loader'; // Import the new component
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of events when the component mounts
    getEvents()
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Use the new Loader component
    return <Loader />;
  }

  return (
    <div className="cards-container">
      {events.map(event => {
        // Find the first media item that is an 'image' to use as a thumbnail.
        const thumbnail = event.media?.find(item => item.mediaType === 'image');

        return (
          <Link to={`/events/${event.slug}`} key={event._id} className="event-card">
            <div className="card-img-wrapper">
              {thumbnail ? (
                // If an image thumbnail is found, display it.
                <img src={thumbnail.url} alt={event.name} className="card-img" />
              ) : (
                // Otherwise, display the placeholder.
                <div className="card-img placeholder">No Image</div>
              )}
            </div>
            <div className="card-body">
              <h3 className="card-title">{event.name}</h3>
              <p className="card-date">
                {new Date(event.date).toLocaleDateString('kn-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="card-place">{event.place}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Events;