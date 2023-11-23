// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'abhigyan',   //change this password according to loacl your machine
  database: 'grocery',
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests


app.get('/', (req, res) => {
  res.send('Welcome to the Grocery App API'); // You can customize this response
});


app.get('/api/wishlist/:custid', (req, res) => {
  const custId = req.params.custid;

  const query = `
    SELECT w.cust_id, w.item_id, i.item_name, i.item_quantity, i.seller_name, i.item_rating, i.image_link, i.price
    FROM wishlist w
    INNER JOIN inventory i ON w.item_id = i.item_id
    WHERE w.cust_id = ?;
  `;

  console.log("Executing the query",  query);

  db.query(query, [custId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Error executing SQL query' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/remove-from-wishlist', (req, res) => {
  const { custId, itemId } = req.body;

  const deleteQuery = 'DELETE FROM wishlist WHERE cust_id = ? AND item_id = ?';

  db.query(deleteQuery, [custId, itemId], (err, result) => {
    if (err) {
      console.error('Error removing item from wishlist:', err);
      res.status(500).json({ error: 'Error removing item from wishlist' });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate that the 'email' and 'password' parameters are present
  if (!email || !password) {
      return res.status(400).json({ error: 'Missing required parameters: email and password' });
  }

  const query = 'SELECT cust_id FROM auth_details WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
      if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({ error: 'Error executing SQL query' });
      }

      // Check if any rows were returned
      if (results.length > 0) {
          // Authentication successful
          const custId = results[0].cust_id;
          return res.json({ success: true, custId });
      } else {
          // Authentication failed
          return res.json({ success: false });
      }
  });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validate that the required parameters are present
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Generate a unique cust_id (1 + max of all current cust_ids)
  db.query('SELECT MAX(cust_id) AS maxId FROM auth_details', (err, result) => {
    if (err) {
      console.error('Error getting max cust_id:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const nextCustId = result[0].maxId + 1;

    // Insert into auth_details
    db.query(
      'INSERT INTO auth_details (cust_id, password, last_login, email) VALUES (?, ?, NOW(), ?)',
      [nextCustId, password, email],
      (err) => {
        if (err) {
          console.error('Error inserting into auth_details:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Insert into customer
        db.query(
          'INSERT INTO customer (cust_id, fname, lname, address) VALUES (?, ?, NULL, NULL)',
          [nextCustId, name],
          (err) => {
            if (err) {
              console.error('Error inserting into customer:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return success response with custId
            return res.json({ success: true, custId: nextCustId });
          }
        );
      }
    );
  });
});



app.get('/api/top-items', (req, res) => {
  const query = 'SELECT item_id, item_name, image_link, price FROM inventory LIMIT 10'; // Fetch the first 10 items with specified columns
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Error executing SQL query' });
    } else {
      res.json(results);
    }
  });
});



app.post('/api/execute-sql', (req, res) => {
  const { query } = req.body;

  // Validate that the 'query' parameter is present
  if (!query) {
    return res.status(400).json({ error: 'Missing required parameter: query' });
  }


  console.log('Executing SQL query:', query);
  // Use the `query` parameter to execute the SQL query here.
  // You can use the MySQL library to interact with the database.

  // Example code:
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Error executing SQL query' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
