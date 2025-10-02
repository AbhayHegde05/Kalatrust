import React, { useState, useEffect } from 'react';
import { getGalleryMedia } from '../services/api';
import './Gallery.css';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState('image');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading gallery...</p>;
  }

  return (
    <div className="gallery-container">
      <h1>ಚಿತ್ರಭಂಢಾರ</h1>
      <div className="tabs">
        <button onClick={() => setFilter('image')} className={filter === 'image' ? 'active' : ''}>Images</button>
        <button onClick={() => setFilter('video')} className={filter === 'video' ? 'active' : ''}>Videos</button>
      </div>

      <div className="gallery-grid">
        {filteredMedia.length > 0 ? (
          filteredMedia.map(item => (
            <div key={item._id} className="gallery-item">
              {item.mediaType === 'image' ? (
                <img src={item.url} alt={item.caption || 'Gallery Image'} />
              ) : (
                <video src={item.url} controls />
              )}
              {item.caption && <p className="caption">{item.caption}</p>}
            </div>
          ))
        ) : (
          <p>No {filter}s found in the gallery.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;