import React from 'react';
import SearchBooks from './SearchBook';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearchResults, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      setToken(null); // Should work as a function
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Book Collection</h1>
      <SearchBooks onSearchResults={onSearchResults} />
      <div className="user-info">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
