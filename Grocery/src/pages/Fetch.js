import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [itemId,setItemId] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/itemids') // Replace with your actual endpoint
      .then(function(res){
          alert('The connection is working perfectly');
          setItemId(res.data);
      })
      .catch(function(e){
        alert('there was an Error fetching data');
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <h1>Item Ids of data are:-</h1>
         <ul>
         {itemId.map(itemid => (
          <li key={itemid.item_id}>
            {itemid.item_id}: {itemid.item_name}
          </li>
         ))}
         </ul>
    </div>
  );
}

export default App;
