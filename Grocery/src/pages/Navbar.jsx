// Navbar.js

import React from 'react';
import './Navbar.css';
import { Feather, Home } from 'react-feather';

const Navbar = () => {
  return (
    <nav className="navbar">
      <button className='nav-icons'><Home/></button>
      <div className="navbar-title">Grocery Shopping App</div>
    </nav>
  );
};

export default Navbar;
