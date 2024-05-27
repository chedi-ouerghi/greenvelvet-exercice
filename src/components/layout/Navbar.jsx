import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="navbar-brand">Checklist App</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/add-checklist">Add Checklist</Link>
          <button className="login-button">Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
