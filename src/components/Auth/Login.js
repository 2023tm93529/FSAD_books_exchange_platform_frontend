import React, { useState } from 'react';
import './Auth.css';
import { loginUser } from '../../api';

const Login = ({ setToken, setUserId, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const { token, userId } = response.data; // Destructure both token and userId
      setToken(token);
      setUserId(userId); // Set userId
      onLogin(token, userId); // Call onLogin with both token and userId
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
