import React, { useState } from 'react';
import { resetPassword } from '../../api'; // Assume this function handles the password reset API call
import './Auth.css';

const ResetPassword = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const handleResetPassword = async (e) => {
      e.preventDefault();
      setMessage('');
  
      if (newPassword !== confirmPassword) {
        setMessage("Passwords don't match!");
        return;
      }
  
      try {
        const response = await resetPassword(email, newPassword);
        if (response && response.msg === 'Password has been reset successfully') {
          setMessage('Password has been reset successfully.');
          setMessageType('success');
          setTimeout(() => {
            onBack(); // Return to the login view
          }, 1000);
        } else {
          setMessage('Failed to reset password.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        setMessage(error.message || 'Error: Unable to reset password.');
        setMessageType('error');
      }
    };
  
    return (
      <div className="form-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <label>
            Email:
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <label>
            New Password:
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </label>
          <label>
            Confirm New Password:
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onBack} className="link" style={{marginLeft:'65px'}}>
            Back to Login
          </button>
          {message && (
          <p 
            className="message" 
            style={{
              color: messageType === 'success' ? 'green' : 'red'
            }}
          >
            {message}
          </p>
        )}
        </form>
      </div>
    );
  };
  

export default ResetPassword;
