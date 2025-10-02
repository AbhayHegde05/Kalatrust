import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { checkUser } from '../../services/auth'; // Corrected import

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      // The checkUser service now directly returns the user object or null
      const user = await checkUser();

      if (!user) {
        // If no user is returned, redirect to the login page
        navigate('/admin');
      }
      setLoading(false);
    };

    verifySession();
  }, [navigate]);

  // While checking the session, show a loading message
  if (loading) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Authenticating...</p>;
  }

  // Once authentication is confirmed, render the protected admin pages
  return <Outlet />;
};

export default AdminLayout;