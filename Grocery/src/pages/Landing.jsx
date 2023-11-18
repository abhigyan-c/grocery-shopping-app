import React from 'react';
import './Landing.css';
import Navbar from './Navbar';
import item1 from './item1.png'
import item2 from './item2.png'
// import item3 from '/Grocery/src/assets/ulhdg64n.bmp'

const Landing = () => {
    // const item1='/images/item1.png';
    // const item2='/images/item2.png';

  return (
    <div>

      {/* Search Bar */}
      <div>
        <input type="text" placeholder="Search for items" />
        <button>Search</button>
      </div>

      {/* Top Items Section */}
      <section>
        <h2>Top Items</h2>
        <div className="top-items-container">
          {/* Display top items here */}
          <div className="top-item1">
            <img src={item1} alt="cucumber" />
            <p>Cucumber</p>
            <p>$10.99</p>
          </div>
          <div className="top-item2">
            <img src={item2} alt="Tomato" />
            <p>Tomato</p>
            <p>$8.99</p>
          </div>
          <div className='top-item3'>
          <img src={item2} alt="DragonFruit" />
            <p>DragonFruit</p>
            <p>$11.99</p>
          </div>
          {/* Add more top items as needed */}
        </div>
      </section>
    </div>
  );
};

export default Landing;
