import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/auth';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import './Admin.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginService({ username, password });
      if (response.success) {
        // Update the global state with the user data
        login(response.user);
        // Navigate to the dashboard
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;