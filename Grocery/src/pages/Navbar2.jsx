// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, LogOut, ShoppingCart, Heart, List, Settings,User, LogIn } from 'react-feather';
import './NavBar.css'; // Import your CSS file
import toast, { Toaster } from 'react-hot-toast';
const NavBar = () => {
    function tst(){
        
        toast.error('Please Log-In/Sign-up',{style:{background: 'pink',color:'black',border:'1px solid white'}})
    }
  return (
    <>
    <Toaster position="top-center" reverseOrder={true}/>
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link onClick={tst} className="navbar-item">
          <List size={24} />
          Orders
        </Link>
        {/* to="/wishlist" */}
        <Link onClick={tst} className="navbar-item">
          <Heart size={24} />
          Wishlist
        </Link>
        <Link to="/" className="navbar-item">
          <Home size={24} />
          Home
        </Link>
        <Link onClick={tst} className="navbar-item">
          <ShoppingCart size={24} />
          Cart
        </Link>
        <Link onClick={tst} className="navbar-item">
          <Settings size={24} />
          Profile
        </Link>
        <Link to="/login" className="navbar-item">
          <User size={24} />
          Sign-in /<br/> Sign-Up
        </Link>
      </div>
    </nav>
    </>);
};

export default NavBar;
