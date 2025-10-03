import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkUser } from '../services/auth';
import Loader from '../components/Loader';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session when the app first loads
    const verifySession = async () => {
      try {
        const currentUser = await checkUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("No active session found.");
      } finally {
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
  
  // While checking the initial session, show a loader
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};