import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DatabaseTest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>MySQL Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.cust_id}>{item.fname} {item.lname}</li> 
        ))}
      </ul>
    </div>
  );
}

export default DatabaseTest;
