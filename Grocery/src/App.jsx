import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'
import Profile from './pages/Profile' 
import DatabaseTest from './pages/DatabaseTest'
import OrderHistory from './pages/OrderHistory'
import Navbar from './pages/Navbar'
import ProductPage from './pages/ProductPage'
import Landing from './pages/Landing';
import Navbar2 from './pages/Navbar2';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import SearchResults from './pages/SearchResults';


const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/order-history">Order History</Link></li>
        <li><Link to="/product/:itemId">Product 1</Link></li>
        {/* Add more links for other routes */}
      </ul>
    </nav>
  );
};
function App() {
  const orders = [
    {
      orderId: 1,
      date: '2023-11-01',
      total: 500,
      items: [
        { itemId: 1, name: 'Bread', quantity: 2 },
        { itemId: 2, name: 'Milk', quantity: 1 },
        { itemId: 3, name: 'Eggs', quantity: 12 },
      ],
    },
    {
      orderId: 2,
      date: '2023-11-05',
      total: 750,
      items: [
        { itemId: 4, name: 'Rice', quantity: 1 },
        { itemId: 5, name: 'Vegetables', quantity: 3 },
        { itemId: 6, name: 'Spices', quantity: 2 },
      ],
    },
    {
      orderId: 3,
      date: '2023-11-10',
      total: 300,
      items: [
        { itemId: 7, name: 'Snacks', quantity: 2 },
        { itemId: 8, name: 'Soda', quantity: 1 },
      ],
    },
    {
      orderId: 4,
      date: '2023-11-15',
      total: 600,
      items: [
        { itemId: 9, name: 'Chicken', quantity: 1 },
        { itemId: 10, name: 'Potatoes', quantity: 4 },
        { itemId: 11, name: 'Salad', quantity: 1 },
      ],
    },
    {
      orderId: 5,
      date: '2023-11-20',
      total: 400,
      items: [
        { itemId: 12, name: 'Pasta', quantity: 2 },
        { itemId: 13, name: 'Tomato Sauce', quantity: 1 },
      ],
    },
    {
      orderId: 6,
      date: '2023-11-25',
      total: 900,
      items: [
        { itemId: 14, name: 'Fruits', quantity: 3 },
        { itemId: 15, name: 'Yogurt', quantity: 2 },
      ],
    },
    {
      orderId: 7,
      date: '2023-11-30',
      total: 350,
      items: [
        { itemId: 16, name: 'Chips', quantity: 1 },
        { itemId: 17, name: 'Dip', quantity: 1 },
      ],
    },
    {
      orderId: 8,
      date: '2023-12-05',
      total: 800,
      items: [
        { itemId: 18, name: 'Coffee', quantity: 1 },
        { itemId: 19, name: 'Tea', quantity: 1 },
        { itemId: 20, name: 'Biscuits', quantity: 2 },
      ],
    },
    {
      orderId: 9,
      date: '2023-12-10',
      total: 550,
      items: [
        { itemId: 21, name: 'Fish', quantity: 1 },
        { itemId: 22, name: 'Lemon', quantity: 3 },
        { itemId: 23, name: 'Herbs', quantity: 1 },
      ],
    },
    {
      orderId: 10,
      date: '2023-12-15',
      total: 700,
      items: [
        { itemId: 24, name: 'Ice Cream', quantity: 1 },
        { itemId: 25, name: 'Cake', quantity: 1 },
      ],
    },
  ];

  const [loggedIn, setLoggedIn] = useState(false); //use this is log-in/sign-in
  const [custId, setCustId] = useState(0);
  const handleLogin = (customerId) => {
    setLoggedIn(true);
    setCustId(customerId);
  };

  console.log({custId});

  return (
    <Router>
      <div>
        {/* Your other components and routes */}
        {loggedIn && <Navbar custId={custId}/>}
        {!loggedIn && <Navbar2/>}
        <Routes>
          <Route path = "/" element = {<Landing/>}/>
          <Route path="/order-history/:custId" element={<OrderHistory cust_id={custId}/>} />
          <Route path="/product/:id" element={<ProductPage custId={custId}/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path='/wishlist/:custId' element={<Wishlist custid={custId}/>} />
          <Route path='/cart/:custId' element={<Cart custid = {custId}/>}/>
          <Route path='/searchresults' element={<SearchResults/>}/>
      </Routes>
      </div>
    </Router>
  );
};

export default App