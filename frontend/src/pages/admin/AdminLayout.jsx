import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth';
import Loader from '../../components/Loader';
import './Admin.css';

const navItems = [
  { to: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/admin/event/new', icon: '➕', label: 'New Event' },
];

const AdminLayout = () => {
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate('/admin/login');
  }, [user, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    authLogout();
  };

  if (!user) return null;

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar-brand">
          <span className="admin-brand-icon">🎭</span>
          <span className="admin-brand-text">SKT Admin</span>
        </div>
        <nav className="admin-sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'admin-nav-link--active' : ''}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <button className="admin-burger" onClick={() => setSidebarOpen(s => !s)}>
            <span /><span /><span />
          </button>
          <span className="admin-topbar-title">Saraswathi Kala Trust</span>
          <div className="admin-topbar-user">
            <span className="admin-user-dot" />
            <span>{user.username}</span>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
