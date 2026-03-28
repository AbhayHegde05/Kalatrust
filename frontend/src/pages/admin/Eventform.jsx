import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getAdminEvent, createAdminEvent, updateAdminEvent,
  uploadFile, addMediaToEvent, deleteMedia
} from '../../services/api';

const EventForm = () => {
  const [eventData, setEventData] = useState({ name:'', date:'', place:'', description:'', artists:[''] });
  const [media, setMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getAdminEvent(id)
        .then(res => {
          setEventData({
            ...res.data,
            date: res.data.date ? res.data.date.split('T')[0] : '',
            artists: res.data.artists?.length ? res.data.artists : [''],
          });
          setMedia(res.data.media || []);
        })
        .catch(() => setError('Could not load event data.'));
    }
  }, [id, isEdit]);

  const showToast = (msg, isErr = false) => {
    setToast(msg);
    if (isErr) setError(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleInput = (e) => setEventData(d => ({ ...d, [e.target.name]: e.target.value }));

  const handleArtist = (i, v) => {
    const a = [...eventData.artists]; a[i] = v;
    setEventData(d => ({ ...d, artists: a }));
  };

  const addArtist = () => setEventData(d => ({ ...d, artists: [...d.artists, ''] }));
  const removeArtist = (i) => {
    if (eventData.artists.length === 1) { handleArtist(0, ''); return; }
    setEventData(d => ({ ...d, artists: d.artists.filter((_, idx) => idx !== i) }));
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    setIsUploading(true); setError(''); setUploadProgress(10);
    const fd = new FormData();
    for (const f of files) fd.append('files', f);
    try {
      setUploadProgress(40);
      const res = await uploadFile(fd);
      setUploadProgress(75);
      const created = await Promise.all(
        res.data.map(f => addMediaToEvent({ program: id, url: f.url, mediaType: f.mediaType }))
      );
      setMedia(m => [...m, ...created.map(r => r.data)]);
      setUploadProgress(100);
      showToast(`${files.length} file(s) uploaded successfully!`);
    } catch (err) {
      showToast(err.code === 'ECONNABORTED' ? 'Upload timed out. Try smaller files.' : 'Upload failed.', true);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      e.target.value = null;
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      await deleteMedia(mediaId);
      setMedia(m => m.filter(x => x._id !== mediaId));
      showToast('Media deleted.');
    } catch {
      showToast('Could not delete media.', true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.place) {
      setError('Name, Date, and Place are required.'); return;
    }
    setIsSaving(true); setError('');
    const payload = { ...eventData, artists: eventData.artists.filter(a => a.trim()) };
    try {
      if (isEdit) {
        await updateAdminEvent(id, payload);
        showToast('Event saved successfully!');
      } else {
        const res = await createAdminEvent(payload);
        showToast('Event created! You can now add media.');
        navigate(`/admin/event/edit/${res.data._id}`, { replace: true });
      }
    } catch {
      showToast('Failed to save event.', true);
    } finally {
      setIsSaving(false);
    }
  };

  const images = media.filter(m => m.mediaType === 'image');
  const videos = media.filter(m => m.mediaType === 'video');

  return (
    <div className="ef-page">
      {/* Toast */}
      {toast && (
        <div className={`ef-toast ${error ? 'ef-toast--err' : 'ef-toast--ok'}`}>{toast}</div>
      )}

      <div className="ef-header">
        <div>
          <h1>{isEdit ? 'Edit Event' : 'Create New Event'}</h1>
          {isEdit && <p className="ef-subtitle">ID: {id}</p>}
        </div>
        <Link to="/admin/dashboard" className="ef-back-btn">← Dashboard</Link>
      </div>

      {/* Tabs */}
      <div className="ef-tabs">
        <button
          className={`ef-tab ${activeTab === 'details' ? 'ef-tab--active' : ''}`}
          onClick={() => setActiveTab('details')}
        >📝 Event Details</button>
        <button
          className={`ef-tab ${activeTab === 'media' ? 'ef-tab--active' : ''} ${!isEdit ? 'ef-tab--disabled' : ''}`}
          onClick={() => isEdit && setActiveTab('media')}
          title={!isEdit ? 'Save event first to manage media' : ''}
        >
          🖼️ Media ({media.length})
        </button>
      </div>

      {/* Details tab */}
      {activeTab === 'details' && (
        <div className="ef-card">
          {error && <div className="ef-error">{error}</div>}
          <form onSubmit={handleSubmit} className="ef-form">
            <div className="ef-form-grid">
              <div className="ef-field">
                <label>Event Name *</label>
                <input name="name" value={eventData.name} onChange={handleInput} required placeholder="e.g. Yakshagana Mahotsava 2025" />
              </div>
              <div className="ef-field">
                <label>Date *</label>
                <input type="date" name="date" value={eventData.date} onChange={handleInput} required />
              </div>
              <div className="ef-field ef-field--full">
                <label>Place *</label>
                <input name="place" value={eventData.place} onChange={handleInput} required placeholder="e.g. Udupi, Karnataka" />
              </div>
              <div className="ef-field ef-field--full">
                <label>Description</label>
                <textarea name="description" value={eventData.description} onChange={handleInput} rows={5} placeholder="Describe the event…" />
              </div>
            </div>

            <div className="ef-field">
              <label>Artists / Performers</label>
              <div className="ef-artists">
                {eventData.artists.map((a, i) => (
                  <div key={i} className="ef-artist-row">
                    <input
                      value={a}
                      onChange={e => handleArtist(i, e.target.value)}
                      placeholder={`Artist ${i + 1}`}
                    />
                    <button type="button" className="ef-remove-btn" onClick={() => removeArtist(i)}>×</button>
                  </div>
                ))}
                <button type="button" className="ef-add-artist-btn" onClick={addArtist}>+ Add Artist</button>
              </div>
            </div>

            <div className="ef-form-actions">
              <button type="submit" className="ef-save-btn" disabled={isSaving}>
                {isSaving ? '⏳ Saving…' : isEdit ? '💾 Save Changes' : '🚀 Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media tab */}
      {activeTab === 'media' && isEdit && (
        <div className="ef-card">
          {error && <div className="ef-error">{error}</div>}

          {/* Upload zone */}
          <div className="ef-upload-zone">
            <input
              type="file"
              id="media-upload"
              multiple
              accept="image/*,video/*"
              onChange={handleUpload}
              disabled={isUploading}
              className="ef-upload-input"
            />
            <label htmlFor="media-upload" className={`ef-upload-label ${isUploading ? 'ef-upload-label--busy' : ''}`}>
              {isUploading ? (
                <>
                  <div className="admin-spinner" />
                  <span>Uploading… {uploadProgress}%</span>
                  <div className="ef-progress-bar">
                    <div className="ef-progress-fill" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </>
              ) : (
                <>
                  <span className="ef-upload-icon">📁</span>
                  <span>Click to upload photos &amp; videos</span>
                  <span className="ef-upload-hint">JPG, PNG, MP4, MOV — multiple files supported</span>
                </>
              )}
            </label>
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div className="ef-media-section">
              <h3>📸 Photos ({images.length})</h3>
              <div className="ef-media-grid">
                {images.map(m => (
                  <div key={m._id} className="ef-media-item">
                    <img src={m.url} alt="Event photo" />
                    <button className="ef-media-delete" onClick={() => handleDeleteMedia(m._id)}>×</button>
                    <span className="ef-media-type-badge">Photo</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <div className="ef-media-section">
              <h3>🎬 Videos ({videos.length})</h3>
              <div className="ef-media-grid ef-media-grid--videos">
                {videos.map(m => (
                  <div key={m._id} className="ef-media-item ef-media-item--video">
                    <video src={m.url} controls />
                    <button className="ef-media-delete" onClick={() => handleDeleteMedia(m._id)}>×</button>
                    <span className="ef-media-type-badge ef-media-type-badge--video">Video</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {media.length === 0 && (
            <div className="ef-media-empty">
              <span>🖼️</span>
              <p>No media uploaded yet. Use the upload zone above.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventForm;
