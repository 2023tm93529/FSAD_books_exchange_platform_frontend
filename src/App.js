import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import BookList from './components/Books/BookList';
import Navbar from './components/Books/NavBar';

function App() {
  const [token, setToken] = useState(null); // State for token
  const [userId, setUserId] = useState('');

  return (
    <Router>
      <div className="App">
        {/* Render Navbar only if token exists */}
        {token && <Navbar onSearchResults={() => {}} setToken={setToken} />}
        <Routes>
          <Route
            path="/login"
            element={!token ? <AuthPage setToken={setToken} setUserId={setUserId} /> : <Navigate to="/books" />}
          />
          <Route
            path="/books"
            element={token ? (
              <BookList token={token} userId={userId} setToken={setToken} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="*"
            element={<Navigate to={!token ? "/login" : "/books"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
