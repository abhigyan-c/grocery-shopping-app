// OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = ({ cust_id }) => {
  const [orders, setOrders] = useState([]);
  const orderList = Array.isArray(orders) ? orders : [];
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/api/order-history/${cust_id}`);
        console.log('Response data:', response.data);
  
        // Check if the response data is an array or can be converted to an array
        const orderData = Array.isArray(response.data) ? response.data : [response.data];
  
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
  
    fetchOrderHistory();
  }, [cust_id]);
  
  

  return (
    <div className="order-history-container">
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-cards">
          {orderList.map((order) => (
  <div key={order.order_id} className="order-card">
    <div className="order-header">
      <h3>Order ID: {order.order_id}</h3>
      <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
    </div>
    <div className="order-items">
      <h4>Item:</h4>
      <ul>
        {order.item_name}
      </ul>
    </div>
    <div className="order-total">
      <p>Total: ₹{order.price}</p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default OrderHistory;
