import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminEvents, deleteAdminEvent } from '../../services/api';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = () => {
    setLoading(true); setError('');
    getAdminEvents()
      .then(res => { setEvents(Array.isArray(res.data) ? res.data : []); setLoading(false); })
      .catch(() => { setError('Could not load events.'); setLoading(false); });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This will also remove all associated media.`)) return;
    setDeleting(id);
    try {
      await deleteAdminEvent(id);
      setEvents(ev => ev.filter(e => e._id !== id));
    } catch {
      alert('Could not delete event.');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = events.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.place?.toLowerCase().includes(search.toLowerCase())
  );

  const now = new Date();
  const upcoming = filtered.filter(e => new Date(e.date) >= now);
  const past = filtered.filter(e => new Date(e.date) < now);

  const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }); }
    catch { return '—'; }
  };

  const EventRow = ({ event }) => (
    <tr>
      <td>
        <div className="dash-event-name">{event.name}</div>
        <div className="dash-event-place">📍 {event.place}</div>
      </td>
      <td className="dash-date">{formatDate(event.date)}</td>
      <td>
        <span className={`dash-badge ${new Date(event.date) >= now ? 'badge-upcoming' : 'badge-past'}`}>
          {new Date(event.date) >= now ? 'Upcoming' : 'Past'}
        </span>
      </td>
      <td className="dash-actions">
        <Link to={`/admin/event/edit/${event._id}`} className="dash-btn dash-btn--edit">
          ✏️ Edit
        </Link>
        <button
          onClick={() => handleDelete(event._id, event.name)}
          className="dash-btn dash-btn--delete"
          disabled={deleting === event._id}
        >
          {deleting === event._id ? '…' : '🗑️ Delete'}
        </button>
      </td>
    </tr>
  );

  return (
    <div className="dash-page">
      {/* Stats */}
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="dash-stat-icon">📅</span>
          <div>
            <p className="dash-stat-num">{events.length}</p>
            <p className="dash-stat-label">Total Events</p>
          </div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon">🔔</span>
          <div>
            <p className="dash-stat-num">{upcoming.length}</p>
            <p className="dash-stat-label">Upcoming</p>
          </div>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-icon">📜</span>
          <div>
            <p className="dash-stat-num">{past.length}</p>
            <p className="dash-stat-label">Past Events</p>
          </div>
        </div>
        <Link to="/admin/event/new" className="dash-stat-card dash-stat-card--cta">
          <span className="dash-stat-icon">➕</span>
          <div>
            <p className="dash-stat-num">New</p>
            <p className="dash-stat-label">Add Event</p>
          </div>
        </Link>
      </div>

      {/* Table */}
      <div className="dash-table-card">
        <div className="dash-table-header">
          <h2>All Events</h2>
          <input
            className="dash-search"
            placeholder="Search events…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="dash-loading"><div className="admin-spinner" /> Loading…</div>}
        {!loading && error && <p className="admin-error">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <div className="dash-empty">
            <span>🎭</span>
            <p>No events found. <Link to="/admin/event/new">Create one →</Link></p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => <EventRow key={e._id} event={e} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
