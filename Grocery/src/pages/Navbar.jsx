// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, LogOut, ShoppingCart, Heart, List, Settings } from 'react-feather';
import './NavBar.css'; // Import your CSS file



const NavBar = ({ custId }) => {


  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to={`/order-history/${custId}`} className="navbar-item">
          <List size={24} />
          Orders
        </Link>
        
        <Link to={`/wishlist/${custId}`}  className="navbar-item">
          <Heart size={24} />
          Wishlist
        </Link>
        <Link to="/" className="navbar-item">
          <Home size={24} />
          Home
        </Link>
        <Link to={`/cart/${custId}`} className="navbar-item">
          <ShoppingCart size={24} />
          Cart
        </Link>
        <Link to="/profile" className="navbar-item">
          <Settings size={24} />
          Profile
        </Link>
        <Link to="/logout" className='navbar-item'>
          <LogOut size={24}/>
          Log Out
          </Link>
      </div>
    </nav>
  );
};

export default NavBar;
