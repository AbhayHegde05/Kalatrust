import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { checkUser } from '../../services/auth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const user = await checkUser();
      if (!user) {
        // If no user is authenticated, redirect to the correct login page
        navigate('/admin/login');
      }
      setLoading(false);
    };

    verifySession();
  }, [navigate]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Authenticating...</p>;
  }

  return <Outlet />;
};

export default AdminLayout;