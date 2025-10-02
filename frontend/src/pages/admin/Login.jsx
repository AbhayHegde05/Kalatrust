import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth'; // Corrected import path
import './Admin.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors on a new submission
    try {
      const response = await login({ username, password });
      if (response.success) {
        // Navigate to the admin dashboard on successful login
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // This block will catch network errors or 4xx/5xx responses from the API
      setError('Invalid credentials. Please try again.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;