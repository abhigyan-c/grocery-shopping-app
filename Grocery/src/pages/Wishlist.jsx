import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Trash } from 'react-feather';

const Wishlist = ({custid}) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
 

  useEffect(() => {
    // Fetch wishlist items based on customer ID
    axios.get(`http://localhost:8080/api/wishlist/${custid}`)
      .then((response) => {
        console.log('Server Response:', response.data);
        setWishlistItems(response.data);
      })
      .catch((error) => console.error('Error fetching wishlist items:', error));
  }, [custid]);

  function addToCart(item) {
    // Logic to add the product to the cart goes here
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to Cart Successfully!`);
  }

  function removeFromWishlist(item) {
    // Send a request to the server to remove the item from the wishlist
    axios.post('http://localhost:8080/api/remove-from-wishlist', {
      custId: item.cust_id,
      itemId: item.item_id,
    })
      .then((response) => {
        if (response.data.success) {
          // If the item is successfully removed, update the state to reflect the change
          const updatedWishlist = wishlistItems.filter((i) => i.item_id !== item.item_id);
          setWishlistItems(updatedWishlist);
          toast.success('Item removed from wishlist successfully!');
        } else {
          toast.error('Error removing item from wishlist');
        }
      })
      .catch((error) => console.error('Error removing item from wishlist:', error));
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='outerbox'>
        <h1>Your Wishlist Items:-</h1>
        {wishlistItems.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.item_id} className='box'>
              <div className='items'>
                <h2 className='item-name'>{`Item Name: ${item.item_name}`}</h2>
                <p className='quantity'>{`Quantity: ${item.item_quantity} kg`}</p>
                <p className='price'>{`Price: ${item.price}.00`}</p>
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
                  <button className='addtocart-btn' onClick={() => addToCart(item)}>
                    <span className='one'>Add to Cart</span>
                    <span className='two'><ShoppingCart /></span>
                  </button>
                  <button className='delete-btn' onClick={() => removeFromWishlist(item)}>
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Wishlist;
