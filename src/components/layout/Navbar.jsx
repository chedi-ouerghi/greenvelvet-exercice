import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
       <Link to="/">  <div className="navbar-brand">Checklist App</div></Link>
        <div className="navbar-links">
          <Link to="/add-checklist">Add Checklist</Link>
           <Link to="/login"><button className="login-button">Login</button></Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
