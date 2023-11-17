// OrderHistory.js

import React from 'react';
import './OrderHistory.css';

const OrderHistory = ({ orders }) => {
  return (
    <div className="order-history-container">
    
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-cards">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order.orderId}</h3>
                <p>Date: {order.date}</p>
              </div>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.itemId}>
                      {item.name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-total">
                <p>Total: ₹{order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
