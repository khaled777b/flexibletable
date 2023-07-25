import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Header = () => {
  // You can add logic here for handling authentication and user information
  const isAuthenticated = false; // Replace with your actual authentication logic
  const username = 'John Doe'; // Replace with the authenticated user's username

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">Your App Logo</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/table-listing">Table Listing</Link>
          </li>
          {/* Add more links to other pages as needed */}
        </ul>
        <div className="user-section">
          {isAuthenticated ? (
            <React.Fragment>
              <span>Welcome, {username}</span>
              <Link to="/user-profile">Profile</Link>
              <button>Logout</button> {/* Add logout functionality */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </React.Fragment>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
