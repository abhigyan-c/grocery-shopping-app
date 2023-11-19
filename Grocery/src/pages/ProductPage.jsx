// ProductPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Add this import
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({
    name: '',
    photo: '',
    ratings: 0,
    description: '',
    features: [],
  });

  const userRatings = [
    { name: 'User1', rating: 4 },
    { name: 'User2', rating: 5 },
    { name: 'User3', rating: 3.5 },
  ];

  const [loading, setLoading] = useState(true);

  const executeSQLQuery = async (query, params) => {
    try {
      const response = await axios.post('http://localhost:8080/api/execute-sql', { query, params }, { timeout: 20000 });
      return response.data;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define your SQL query for fetching product details and ratings
        const sqlQuery = `
          SELECT 
            i.item_id,
            i.item_name,
            i.item_rating,
            i.image_link,
            i.description
          FROM 
            inventory i
          WHERE 
            i.item_id = ${id};
        `;
  
        // Pass the actual item_id when making the request
        const params = [id];
        const fetchedData = await executeSQLQuery(sqlQuery, params);
  
        // Check if fetchedData is an array and take the first element
        const productData = Array.isArray(fetchedData) ? fetchedData[0] : fetchedData;
  
        setProduct({
          name: productData.item_name,
          photo: productData.image_link,
          ratings: productData.item_rating,
          description: productData.description,
        });
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page-container">
        
      <div className="product-details">
      <div className="product-photo">
          <img src={product.photo} alt={product.name}/>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            Rating: <span className="rating-number">{product.ratings}</span>
          </div>
          <div className="pincode-check">
            <label>Check Pincode:</label>
            <input type="text" placeholder="Enter Pincode" />
            <button>Check</button>
          </div>
          <div className="product-actions">
            <button className="add-to-cart">Add to Cart</button>
            <button className="add-to-wishlist">Add to Wishlist</button>
            <button className="buy-now">Buy Now</button>
          </div>
          <div className='product-desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores dignissimos aut, officia explicabo nostrum corrupti nisi ut eveniet at obcaecati eos tenetur dolor in. Obcaecati delectus eaque quis quo laudantium.
          </div>
        </div>
        
      </div>
      


      <div className="user-ratings">
        <h2>User Ratings</h2>
        <ul>
          {userRatings.map((userRating, index) => (
            <li key={index}>
              <span className="user-name">{userRating.name}</span>
              <span className="user-rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className={index < userRating.rating ? 'star-filled' : 'star-empty'}></span>
                ))}
                <span className="rating-number">{userRating.rating}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
