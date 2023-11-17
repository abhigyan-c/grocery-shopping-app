import React, { useState } from 'react';
import { LogOut, Settings } from 'react-feather';
import './profile.css';

function Profile() {
  const [profileName, setProfileName] = useState('Abhigyan');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(profileName);
  const [orderHistory, setOrderHistory] = useState([
    { id: 1, date: '2023-01-10', description: 'Order #1234' },
    { id: 2, date: '2023-02-15', description: 'Order #5678' },
    { id: 3, date: '2023-03-20', description: 'Order #9012' },
    // Add more order history entries here
  ]);
  const [wishlist, setWishlist] = useState([
    { id: 1, item: 'Product A' },
    { id: 2, item: 'Product B' },
    { id: 3, item: 'Product C' },
    // Add more wishlist items here
  ]);
  const [reviews, setReviews] = useState([
    { id: 1, product: 'Product X', rating: 4, review: 'Great product!' },
    { id: 2, product: 'Product Y', rating: 5, review: 'Excellent quality!' },
    { id: 3, product: 'Product Z', rating: 3, review: 'Decent product.' },
    // Add more reviews here
  ]);
  const [orderTracking, setOrderTracking] = useState([
    { id: 1, orderNumber: 'Order #1234', status: 'Shipped' },
    { id: 2, orderNumber: 'Order #5678', status: 'Delivered' },
    { id: 3, orderNumber: 'Order #9012', status: 'In Progress' },
    // Add more order tracking entries here
  ]);

  const handleUpdateName = () => {
    // Update the user's name in your database
    setProfileName(updatedName);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className='header'>
      <h2 className="profile-heading">Welcome, {profileName}!</h2>
      <button onClick={() => setIsEditing(true)} className="settings">
            <Settings />
      </button>
      <button className='logout'><LogOut/></button>
      </div>
      

      <div className="two-column-layout">
        <div className="column">
          <div className="section">
            <h3><b>Order History</b></h3>
            {orderHistory.slice(0, 3).map((entry) => (
              <div key={entry.id} className="entry">
                <p>Date: {entry.date}</p>
                <p>Description: {entry.description}</p>
              </div>
            ))}
            {orderHistory.length > 2 && (
              <button className="view-more-button">View More</button>
            )}
          </div>

          <div className="section">
            <h3><b>Wishlist</b></h3>
            {wishlist.slice(0, 3).map((entry) => (
              <div key={entry.id} className="entry">
                <p>Item: {entry.item}</p>
              </div>
            ))}
            {wishlist.length > 2 && (
              <button className="view-more-button">View More</button>
            )}
          </div>
        </div>

        <div className="column">
          <div className="section">
            <h3><b>Reviews</b></h3>
            {reviews.slice(0, 3).map((entry) => (
              <div key={entry.id} className="entry">
                <p>Product: {entry.product}</p>
                <p>Rating: {entry.rating}</p>
                <p>Review: {entry.review}</p>
              </div>
            ))}
            {reviews.length > 2 && (
              <button className="view-more-button">View More</button>
            )}
          </div>

          <div className="section">
            <h3><b>Order Tracking</b></h3>
            {orderTracking.slice(0, 3).map((entry) => (
              <div key={entry.id} className="entry">
                <p>Order Number: {entry.orderNumber}</p>
                <p>Status: {entry.status}</p>
              </div>
            ))}
            {orderTracking.length > 2 && (
              <button className="view-more-button">View More</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
