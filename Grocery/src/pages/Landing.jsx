import React from 'react';
import './Landing.css';
import Navbar from './Navbar';
import item1 from './item1.png';
import item2 from './item2.png';

const Landing = () => {
  return (
    <div className="landing-container">

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="   Search for items" />
        <button className="search-button">Search</button>
        {/* <button className="login-button">Log In or Sign Up</button> */}
      </div>

      {/* Top Items Section */}
      <section>
        <h2>Top Items</h2>
        <div className="top-items-container">
          {/* Display top items as cards */}
          <div className="top-item">
            <img src={item1} alt="cucumber" />
            <div className="item-details">
              <p>Cucumber</p>
              <p>$10.99</p>
            </div>
          </div>
          <div className="top-item">
            <img src={item2} alt="Tomato" />
            <div className="item-details">
              <p>Tomato</p>
              <p>$8.99</p>
            </div>
          </div>
          <div className="top-item">
            <img src={item2} alt="DragonFruit" />
            <div className="item-details">
              <p>DragonFruit</p>
              <p>$11.99</p>
            </div>
          </div>
          {/* Add more top items as needed */}
        </div>
      </section>
    </div>
  );
};

export default Landing;
