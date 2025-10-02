import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminEvents, deleteAdminEvent } from '../../services/api';
import { logout } from '../../services/auth';
import './Admin.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    setLoading(true);
    getAdminEvents()
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the event: "${name}"? This action cannot be undone.`)) {
      try {
        await deleteAdminEvent(id);
        setEvents(events.filter(event => event._id !== id));
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Error: Could not delete the event.");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  // Define date formatting options for Kannada
  const kannadaDateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Event Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/admin/event/new" className="btn btn-primary">
            + Add New Event
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <div className="admin-card text-center">
          <p>No events found. Get started by adding one!</p>
        </div>
      ) : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  {/* Format date in Kannada */}
                  <td>{new Date(event.date).toLocaleDateString('kn-IN', kannadaDateOptions)}</td>
                  <td className="actions-cell">
                    <Link to={`/admin/event/edit/${event._id}`} className="btn btn-secondary">Edit</Link>
                    <button onClick={() => handleDelete(event._id, event.name)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;