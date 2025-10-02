import api from './api';

/**
 * Sends login credentials to the backend.
 * @param {object} credentials - The user's credentials {username, password}.
 * @returns {Promise<object>} The server's response.
 */
export const login = async (credentials) => {
  const response = await api.post('/admin', credentials);
  return response.data;
};

/**
 * Sends a logout request to the backend.
 * @returns {Promise<object>} The server's response.
 */
export const logout = async () => {
  const response = await api.post('/admin/logout');
  return response.data;
};

/**
 * Checks with the backend if a user is currently authenticated.
 * @returns {Promise<object|null>} The user object if authenticated, otherwise null.
 */
export const checkUser = async () => {
  try {
    const response = await api.get('/admin/user');
    return response.data.user;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
};