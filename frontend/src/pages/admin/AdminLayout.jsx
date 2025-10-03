import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';

const AdminLayout = () => {
  const { user } = useAuth(); // Get the current user from the context
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs whenever the user state changes.
    // If the user becomes null (e.g., after logout), it will redirect.
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // If the context confirms there is a user, render the protected pages.
  // Otherwise, render nothing while the useEffect redirects.
  return user ? <Outlet /> : null;
};

export default AdminLayout;