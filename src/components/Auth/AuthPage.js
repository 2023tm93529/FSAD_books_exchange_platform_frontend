import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword'; // Import the ResetPassword component
import './AuthPage.css';

const AuthPage = ({ setToken, setUserId }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleSwitch = () => {
    setShowRegister((prev) => !prev);
  };

  const handleForgotPassword = () => {
    setShowResetPassword(true);
  };

  const handleLogin = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
    setShowRegister(false);
  };

  return (
    <div className="auth-container">
      {showResetPassword ? (
        <ResetPassword onBack={handleBackToLogin} />
      ) : showRegister ? (
        <>
          <Register />
          <button className="link" onClick={handleSwitch}>
            Back to Login
          </button>
        </>
      ) : (
        <>
          <Login setToken={setToken} setUserId={setUserId} onLogin={handleLogin} />
          <p>
            <button className="link" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </p>
          <p>
            Don't have an account?{' '}
            <button className="link" onClick={handleSwitch}>
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
