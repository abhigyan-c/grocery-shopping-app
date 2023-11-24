// ProductPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; 
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
  const [quantity, setQuantity] = useState(1);

  const executeSQLQuery = async (query, params) => {
    try {
      const response = await axios.post('http://localhost:8080/api/execute-sql', { query, params }, { timeout: 20000 });
      return response.data;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  };
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const checkPincode = async () => {
    try {
        const response = await executeSQLQuery(`SELECT * FROM serviceable_pins WHERE pincode = ${pincode}`);
        if (response.length > 0) {
            setPincodeStatus('serviceable');
        } else {
            setPincodeStatus('not-serviceable');
        }
    } catch (error) {
        console.error('Error checking pincode:', error);
    }
};

const addToWishlist = async () => {
  try {
    // Make a request to your server to add the item to the wishlist
    const response = await axios.post('http://localhost:8080/api/add-to-wishlist', {
      custId: 101, // Replace with the actual custId
      itemId: id, // Using the id obtained from useParams
    });

    if (response.data.success) {
      // If the item is added to the wishlist successfully, show a toast message
      toast.success('Item added to wishlist successfully!');
    } else {
      // If there was an issue adding the item to the wishlist, show an error toast
      toast.error('Error adding item to wishlist');
    }
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    toast.error('Error adding item to wishlist');
  }
};

const addToCart = async () => {
  try {
    // Make a request to your server to add the item to the cart
    const response = await axios.post('http://localhost:8080/api/add-to-cart', {
      custId: 101, // Replace with the actual custId
      itemId: id, // Using the id obtained from useParams
      quantity: quantity, // Use the quantity state
    });

    if (response.data.success) {
      // If the item is added to the cart successfully, show a toast message
      toast.success('Item added to cart successfully!');
    } else {
      // If there was an issue adding the item to the cart, show an error toast
      toast.error('Error adding item to cart');
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    toast.error('Error adding item to cart');
  }
};

const [userRating, setUserRating] = useState(0);

const addRating = async () => {
  try {
    // Add your logic to update the database with the user's rating
    // For example, you can use executeSQLQuery to insert the rating into a ratings table

    console.log(`User added a rating: ${userRating}`);
    // Update the userRatings state to reflect the new rating
    setUserRatings([...userRatings, { name: 'User', rating: userRating }]);
  } catch (error) {
    console.error('Error adding rating:', error);
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
            <input type="text" placeholder="Enter Pincode" value = {pincode} onChange={(e) => setPincode(e.target.value)}/>
            <button className='btn-45' onClick={checkPincode}><span>Check</span></button>
            </div>
            <div>
            {pincodeStatus && (
              <div className={`pincode-message ${pincodeStatus}`}>
              {pincodeStatus === 'serviceable' ? 'Serviceable Pincode' : 'Not Serviceable Pincode'}
              </div>
            )}
          </div>
          <div className="product-actions">
        <div className='quantity-selector'>
          <label htmlFor='quantity'>Quantity:</label>
          <div className='inp'>
            <input
              type='number'
              id='quantity'
              name='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min='1'
            />
          </div>
        </div>
        <button className="add-to-cart btn-45" onClick={addToCart}>
          <span>Add to Cart</span>
        </button>
        <button className="add-to-wishlist btn-45" onClick={addToWishlist}>
          <span>Add to Wishlist</span>
        </button>
      </div>
          <div className='product-desc'>
            {product.description}
          
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
        <div className="add-rating">
          <label>Add Your Rating:</label>
          <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
            <option value={0}>Select Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button className="btn-45" onClick={addRating}>
            <span>Add Rating</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
