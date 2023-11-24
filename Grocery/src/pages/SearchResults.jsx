// SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/search', { searchQuery });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="search-results-grid">
        {results.map((result) => (
         <Link to={`/product/${result.item_id}`} key={result.item_id} className="product-card-link">
          <div key={result.item_id} className="search-result-card">
            <img src={result.image_link} alt={result.item_name} />
            <h3>{result.item_name}</h3>
            <p>₹{result.price}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
