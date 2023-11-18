// ProductPage.js

import React from 'react';
import './ProductPage.css';

const ProductPage = () => {
  const product = {
    name: 'Dragon Fruit',
    photo: './src/assets/ulhdg64n.bmp',
    ratings: 4.5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.",
    features: [
      "Feature 1: Lorem ipsum dolor sit amet.",
      "Feature 2: Consectetur adipiscing elit.",
      "Feature 3: Nulla facilisi."
    ],
  };

  const userRatings = [
    { name: 'User1', rating: 4 },
    { name: 'User2', rating: 5 },
    { name: 'User3', rating: 3.5 },
  ];

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
