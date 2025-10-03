import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { checkUser } from '../../services/auth';
import Loader from '../../components/Loader';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const user = await checkUser();
      if (user) {
        setIsAuth(true);
      } else {
        // If no user is authenticated, redirect to the login page
        navigate('/admin/login');
      }
      setLoading(false);
    };

    // We only need to run this check once when the layout mounts
    verifySession();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  // If authentication is confirmed, render the protected admin pages
  // Otherwise, render nothing (as the navigate function will have already redirected)
  return isAuth ? <Outlet /> : null;
};

export default AdminLayout;