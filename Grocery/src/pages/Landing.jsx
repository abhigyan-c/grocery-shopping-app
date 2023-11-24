import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Landing.css';
import Navbar from './Navbar';
import item1 from './item1.png';
import item2 from './item2.png';
import TopItems from './TopItems';

const Landing = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/top-items');
        setTopItems(response.data);
      } catch (error) {
        console.error('Error fetching top items:', error);
      }
    };

    fetchTopItems();
  }, []);

  return (
    <div className="landing-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="   Search for items" />
        <button className="search-button">Search</button>
        {/* <button className="login-button">Log In or Sign Up</button> */}
      </div>

      {/* Top Items Section */}
      <section className='top-item-section'>
        <h2>Top Items</h2>
        <TopItems />
      </section>
    </div>
  );
};

export default Landing;
