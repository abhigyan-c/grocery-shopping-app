// Cart.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Trash } from 'react-feather';
import './Cart.css';
import toast from 'react-hot-toast'

const Cart = ({custid}) => {

  console.log("in cart.jsx: ", {custid});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch cart items based on customer ID
    axios.get(`http://localhost:8080/api/cart/${custid}`)
      .then((response) => {
        setCartItems(response.data);
        updateTotalAmount(response.data);
      })
      .catch((error) => console.error('Error fetching cart items:', error));
  }, [custid]);

  const updateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the quantity in the cart and the total amount
    const updatedCart = cartItems.map((item) =>
      item.item_id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    updateTotalAmount(updatedCart);

    // Make a request to update the quantity in the cart table
    axios.post('http://localhost:8080/api/update-cart-quantity', {
      custId: custid,
      itemId: itemId,
      quantity: newQuantity,
    })
      .then((response) => {
        if (!response.data.success) {
          console.error('Error updating cart quantity:', response.data.error);
        }
      })
      .catch((error) => console.error('Error updating cart quantity:', error));
  };

  const handleDeleteItem = (itemId) => {
    // Remove the item from the cart and update the total amount
    const updatedCart = cartItems.filter((item) => item.item_id !== itemId);
    setCartItems(updatedCart);
    updateTotalAmount(updatedCart);

    // Make a request to delete the item from the cart table
    axios.post('http://localhost:8080/api/remove-from-cart', {
      custId: custid,
      itemId: itemId,
    })
      .then((response) => {
        if (!response.data.success) {
          console.error('Error removing item from cart:', response.data.error);
        }
      })
      .catch((error) => console.error('Error removing item from cart:', error));
  };

  const handleCheckout = () => {
    // Make a request to perform the checkout process
    axios.post('http://localhost:8080/api/checkout', {
      custId: custid,
      cartItems: cartItems,
    })
      .then((response) => {
        if (response.data.success) {
          // If the checkout is successful, show a toast message
          toast.success('Thanks for purchasing!');
          // Clear the cart items and update the total amount
          setCartItems([]);
          setTotalAmount(0);
        } else {
          console.error('Error during checkout:', response.data.error);
          // Show an error toast if checkout fails
          toast.error('Error during checkout');
        }
      })
      .catch((error) => {
        console.error('Error during checkout:', error);
        toast.error('Error during checkout');
      });
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.item_id} className="cart-item">
            <img src={item.image_link} alt={item.item_name} />
            <div className="item-details">
              <h3>{item.item_name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-control">
  <button onClick={() => handleQuantityChange(item.item_id, Math.max(1, item.quantity - 1))}>-</button>
  <span>{item.quantity}</span>
  <button onClick={() => handleQuantityChange(item.item_id, item.quantity + 1)}>+</button>
</div>
              <button className="delete-btn" onClick={() => handleDeleteItem(item.item_id)}>
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Amount: ₹{totalAmount}</p>
        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
