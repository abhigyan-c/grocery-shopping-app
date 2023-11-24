import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Landing.css';
import Navbar from './Navbar';
import item1 from './item1.png';
import item2 from './item2.png';
import TopItems from './TopItems';
import { Link } from 'react-router-dom';

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
      <Link to="/searchresults">
      <div className="search-bar">
        
        <button className="search-button">Click here to search for items</button>
        {/* <button className="login-button">Log In or Sign Up</button> */}
      </div>
      </Link>
      {/* Top Items Section */}
      <section className='top-item-section'>
        <h2>Top Items</h2>
        <TopItems />
      </section>
    </div>
  );
};

export default Landing;
