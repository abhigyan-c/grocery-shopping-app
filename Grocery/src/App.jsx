import React from 'react'
import './App.css'
import Profile from './pages/Profile' 
import DatabaseTest from './pages/DatabaseTest'
import OrderHistory from './pages/OrderHistory'
import Navbar from './pages/Navbar'
import ProductPage from './pages/ProductPage'
import Landing from './pages/Landing'
function App() {
  const orders = [
    {
      orderId: '1',
      date: '2023-11-17',
      items: [
        { itemId: '101', name: 'Whipped cream', quantity: 2 },
        { itemId: '102', name: 'Gatorade', quantity: 1 },
      ],
      total: 300,
    },
    {
      orderId: '2',
      date: '2023-11-16',
      items: [
        { itemId: '201', name: 'Biscuits', quantity: 2 },
        { itemId: '002', name: 'Apples', quantity: 1 },
      ],
      total: 152
    }
  ];
  return (
    <>
    <Navbar/>
    <Landing/>
    <div className='overall'>
      {/* <ProductPage/> */}
    </div>
      
    </>
    
  )
}

export default App