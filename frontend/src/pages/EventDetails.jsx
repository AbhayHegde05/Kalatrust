import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug } from '../services/api';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    getEventBySlug(slug)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-deep-terracotta mb-4">{event.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-terracotta text-cream px-4 py-2 rounded-full text-sm font-semibold">
              📅 {new Date(event.date).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="bg-gold text-deep-terracotta px-4 py-2 rounded-full text-sm font-semibold">
              📍 {event.place}
            </span>
          </div>
        </div>

        {/* Media Carousel */}
        {hasMedia && (
          <div className="relative mb-12 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative aspect-video">
              {event.media.map((item, index) => (
                <div
                  key={item._id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.mediaType === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.caption || event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              >
                ❮
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              >
                ❯
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {event.media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-terracotta' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-3xl font-serif text-deep-terracotta mb-6">Event Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description || "No description provided."}
            </p>
          </div>

          {event.artists && event.artists.length > 0 && (
            <div className="card">
              <h2 className="text-3xl font-serif text-deep-terracotta mb-6">Featured Artists</h2>
              <ul className="space-y-3">
                {event.artists.map((artist, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-terracotta mr-3">🎭</span>
                    {artist}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center bg-terracotta hover:bg-deep-terracotta text-cream font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ← Back to All Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;