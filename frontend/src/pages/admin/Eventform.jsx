import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAdminEvent, createAdminEvent, updateAdminEvent, uploadFile, addMediaToEvent, deleteMedia } from '../../services/api';
import './Admin.css';

const EventForm = () => {
  const [eventData, setEventData] = useState({ name: '', date: '', place: '', description: '', artists: [''] });
  const [media, setMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      getAdminEvent(id).then(res => {
        const fetchedData = {
          ...res.data,
          date: res.data.date ? res.data.date.split('T')[0] : '',
          artists: res.data.artists && res.data.artists.length > 0 ? res.data.artists : [''],
        };
        setEventData(fetchedData);
        setMedia(res.data.media || []);
      }).catch(err => {
        console.error("Failed to fetch event data", err);
        setError("Could not load event data.");
      });
    }
  }, [id, isEditMode]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleArtistChange = (index, value) => {
    const updatedArtists = [...eventData.artists];
    updatedArtists[index] = value;
    setEventData({ ...eventData, artists: updatedArtists });
  };

  const addArtist = () => {
    setEventData({ ...eventData, artists: [...eventData.artists, ''] });
  };

  const removeArtist = (index) => {
    if (eventData.artists.length > 1) {
      const updatedArtists = eventData.artists.filter((_, i) => i !== index);
      setEventData({ ...eventData, artists: updatedArtists });
    } else {
      handleArtistChange(0, '');
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setError('');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const uploadRes = await uploadFile(formData); 
      
      const newMediaItems = uploadRes.data.map(file => ({
        program: id,
        url: file.url,
        mediaType: file.mediaType,
      }));

      const creationPromises = newMediaItems.map(item => addMediaToEvent(item));
      const createdMediaResponses = await Promise.all(creationPromises);
      const createdMedia = createdMediaResponses.map(res => res.data);

      setMedia([...media, ...createdMedia]);
      showNotification(`${files.length} file(s) uploaded successfully!`);
    } catch (err) {
      console.error("Upload failed", err);
      setError("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleMediaDelete = async (mediaId) => {
    if (window.confirm("Are you sure you want to delete this media item?")) {
      try {
        await deleteMedia(mediaId);
        setMedia(media.filter(m => m._id !== mediaId));
        showNotification("Media deleted.");
      } catch (err) {
        console.error("Failed to delete media", err);
        setError("Could not delete media.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.place) {
        setError("Name, Date, and Place are required fields.");
        return;
    }
    setIsSaving(true);
    setError('');

    const finalEventData = {
      ...eventData,
      artists: eventData.artists.filter(artist => artist.trim() !== '')
    };

    try {
      if (isEditMode) {
        await updateAdminEvent(id, finalEventData);
        showNotification("Event details saved successfully!");
      } else {
        const newEvent = await createAdminEvent(finalEventData);
        showNotification("Event created successfully! You can now add media.");
        navigate(`/admin/event/edit/${newEvent.data._id}`, { replace: true });
      }
    } catch (err) {
      console.error("Failed to save event", err);
      setError("Failed to save event. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>{isEditMode ? 'Edit Event' : 'Create New Event'}</h1>
        <Link to="/admin/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      {notification && <p className="notification-message">{notification}</p>}

      <div className="form-layout">
        <div className="admin-card form-card">
          <h3>Event Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Event Name</label>
              <input type="text" id="name" name="name" value={eventData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={eventData.date} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="place">Place</label>
              <input type="text" id="place" name="place" value={eventData.place} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="5" value={eventData.description} onChange={handleInputChange}></textarea>
            </div>

            <div className="form-group">
              <label>Artists</label>
              {eventData.artists.map((artist, index) => (
                <div key={index} className="dynamic-input">
                  <input type="text" value={artist} onChange={(e) => handleArtistChange(index, e.target.value)} placeholder={`Artist ${index + 1}`} />
                  <button type="button" onClick={() => removeArtist(index)} className="btn-remove" disabled={eventData.artists.length === 1}>×</button>
                </div>
              ))}
              <button type="button" onClick={addArtist} className="btn-add">+ Add Artist</button>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Event Details'}
            </button>
          </form>
        </div>

        <div className={`admin-card media-card ${!isEditMode ? 'disabled' : ''}`}>
          <h3>Media Management</h3>
          {!isEditMode ? (
            <p>Please save the event details first to enable media uploads.</p>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="media-upload">Upload Images or Videos</label>
                <input type="file" id="media-upload" onChange={handleFileUpload} disabled={isUploading} multiple />
                {isUploading && <p>Uploading, please wait...</p>}
              </div>
              <div className="media-grid">
                {media.map(m => (
                  <div key={m._id} className="media-item-admin">
                    {m.mediaType === 'image' ? (
                      <img src={m.url} alt="Event media" />
                    ) : (
                      <video src={m.url} controls />
                    )}
                    <button onClick={() => handleMediaDelete(m._id)} className="btn-remove-media">×</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventForm;