import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api';

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
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-deep-terracotta mb-4">Cultural Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the richness of Indian performing arts through our curated events and performances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => {
            const thumbnail = event.media?.find(item => item.mediaType === 'image');

            return (
              <Link
                to={`/events/${event.slug}`}
                key={event._id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gold/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  {thumbnail ? (
                    <img
                      src={thumbnail.url}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-terracotta/10 flex items-center justify-center">
                      <span className="text-terracotta text-4xl">🎭</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-deep-terracotta mb-3 group-hover:text-terracotta transition-colors">
                    {event.name}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <span className="mr-2">📅</span>
                      {new Date(event.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {event.place}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-serif text-gray-600 mb-2">No Events Available</h3>
            <p className="text-gray-500">Check back soon for upcoming cultural performances.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;