import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminEvents, deleteAdminEvent } from '../../services/api';
import { logout } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import './Admin.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    setLoading(true);
    setError('');
    getAdminEvents()
      .then(res => {
        // Ensure the response is an array before setting the state
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          // If the data isn't an array, something is wrong
          throw new Error("Received invalid data format from server.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events:", err);
        setError("Could not load events. Please try again later.");
        setLoading(false);
      });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the event: "${name}"?`)) {
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
    authLogout(); // This now correctly calls the logout from the AuthContext
    // The AdminLayout will automatically handle the redirect
  };

  const kannadaDateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Helper function to safely format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'No Date';
    try {
      return new Date(dateString).toLocaleDateString('kn-IN', kannadaDateOptions);
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Event Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/admin/event/new" className="btn btn-primary">+ Add New Event</Link>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && error && (
        <div className="admin-card text-center error-message">{error}</div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="admin-card text-center">
          <p>No events found. Get started by adding one!</p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
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
                  <td>{event.name || 'Untitled Event'}</td>
                  <td>{formatDate(event.date)}</td>
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