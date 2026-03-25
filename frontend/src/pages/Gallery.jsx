import React, { useState, useEffect } from 'react';
import { getGalleryMedia } from '../services/api';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState('image');
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGalleryMedia()
      .then(response => {
        setMedia(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching gallery:", error);
        setLoading(false);
      });
  }, []);

  const filteredMedia = media.filter(item => item.mediaType === filter);

  const openLightbox = (item) => {
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-deep-terracotta mb-4">Media Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of cultural performances, traditional arts, and memorable moments.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-gold/20">
            <button
              onClick={() => setFilter('image')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                filter === 'image'
                  ? 'bg-terracotta text-cream shadow-md'
                  : 'text-gray-600 hover:text-terracotta'
              }`}
            >
              📸 Images
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
                filter === 'video'
                  ? 'bg-terracotta text-cream shadow-md'
                  : 'text-gray-600 hover:text-terracotta'
              }`}
            >
              🎥 Videos
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredMedia.length > 0 ? (
            filteredMedia.map(item => (
              <div
                key={item._id}
                className="break-inside-avoid bg-white rounded-lg overflow-hidden shadow-lg border border-gold/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                {item.mediaType === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.caption || 'Gallery Image'}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-auto object-cover"
                    muted
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                  />
                )}
                {item.caption && (
                  <div className="p-4">
                    <p className="text-gray-700 text-sm">{item.caption}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">{filter === 'image' ? '📸' : '🎥'}</div>
              <h3 className="text-2xl font-serif text-gray-600 mb-2">No {filter === 'image' ? 'Images' : 'Videos'} Available</h3>
              <p className="text-gray-500">Check back soon for new content.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeLightbox}>
            <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 text-white text-3xl hover:text-terracotta transition-colors z-10"
                onClick={closeLightbox}
              >
                ×
              </button>
              {selectedMedia.mediaType === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.caption || 'Gallery Image'}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  className="max-w-full max-h-full object-contain"
                  autoPlay
                />
              )}
              {selectedMedia.caption && (
                <p className="text-white text-center mt-4 text-lg">{selectedMedia.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;