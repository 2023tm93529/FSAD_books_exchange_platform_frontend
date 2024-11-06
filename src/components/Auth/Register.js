import React, { useState } from 'react';
import { registerUser } from '../../api'; // Ensure the path is correct
import './Auth.css'; // Import CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData); // Call the API with form data
      setSuccess('Registration successful! You can now log in.'); // Set success message
      setError(''); // Clear any previous error message
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.'); // Set error message
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
