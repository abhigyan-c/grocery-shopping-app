import React, { useState } from 'react';
import './Wishlist.css';
import toast, { Toaster } from 'react-hot-toast';
import { ShoppingCart,Trash } from 'react-feather';

const Wishlist = () => {
  const [quantity, setQuantity] = useState(1);

  function addToCart() {
    // Logic to add the product to the cart goes here
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to Cart Successfully!`);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className='outerbox'>
        <h1>Your Wishlist Items:-</h1>
        <div className='box'>
          <div className='items'>
            <h2 className='item-name'>Item Name: Tomato</h2>
            <p className='quantity'>Quantity: 5 kg</p>
            <p className='price'>Price: 100.00</p>
            <div className='quantity-selector'>
              <label htmlFor='quantity'>Quantity:</label>
              <div className='inp'>
              <input type='number' id='quantity' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} min='1'/>
            </div>
            <button className='addtocart-btn' onClick={addToCart}>
              <span className='one'>Add to Cart</span>
              <span className='two'><ShoppingCart/></span>
            </button>
            <button className='delete-btn'><Trash/></button> {/*for now this dosent work*/ }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
