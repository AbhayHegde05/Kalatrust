import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkUser as checkUserService } from '../services/auth';
import Loader from '../components/Loader';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    // This effect runs only once when the app starts
    const verifySession = async () => {
      try {
        const currentUser = await checkUserService();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("No active session on initial load.");
      } finally {
        // Critical: Set loading to false after the check is complete
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // While the initial session check is running, show a full-page loader
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// This custom hook makes it easy for any component to access the auth state
export const useAuth = () => {
  return useContext(AuthContext);
};