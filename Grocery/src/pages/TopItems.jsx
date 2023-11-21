// TopItems.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Landing.css';

const TopItems = () => {
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
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="top-items-container">
      {topItems.map((item, index) => (
        <div key={index} className="top-item">
            <Link to={`/product/${item.item_id}`} key={item.item_id} className="top-item">
          <img src={item.image_link} alt={item.item_name} />
          <div className="item-details">
            <p>{item.item_name}</p>
            <p>₹{item.price.toFixed(2)}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TopItems;
