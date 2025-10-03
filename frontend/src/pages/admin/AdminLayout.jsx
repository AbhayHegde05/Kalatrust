import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

const AdminLayout = () => {
  const { user } = useAuth(); // Get the current user from the context
  const navigate = useNavigate();

  useEffect(() => {
    // If the context has no user, redirect to login
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // If there is a user, render the protected pages
  // Otherwise, render nothing while it redirects
  return user ? <Outlet /> : null;
};

export default AdminLayout;