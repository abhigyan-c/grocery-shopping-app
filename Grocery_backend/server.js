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

const executeSQLQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


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

app.post('/api/add-to-wishlist', (req, res) => {
  const { custId, itemId } = req.body;

  // Validate that custId and itemId are present
  if (!custId || !itemId) {
    return res.status(400).json({ error: 'Missing required parameters: custId and itemId' });
  }

  // Check if the item is already in the wishlist
  const checkQuery = 'SELECT * FROM wishlist WHERE cust_id = ? AND item_id = ?';
  db.query(checkQuery, [custId, itemId], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking wishlist:', checkError);
      return res.status(500).json({ error: 'Error checking wishlist' });
    }

    if (checkResults.length > 0) {
      // The item is already in the wishlist
      return res.json({ success: false, message: 'Item already in wishlist' });
    }

    // If the item is not in the wishlist, add it
    const addToWishlistQuery = 'INSERT INTO wishlist (cust_id, item_id) VALUES (?, ?)';
    db.query(addToWishlistQuery, [custId, itemId], (addToWishlistError) => {
      if (addToWishlistError) {
        console.error('Error adding item to wishlist:', addToWishlistError);
        return res.status(500).json({ error: 'Error adding item to wishlist' });
      }

      // Item added to the wishlist successfully
      return res.json({ success: true, message: 'Item added to wishlist successfully' });
    });
  });
});


app.post('/api/search', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');

    // Construct a WHERE clause dynamically based on search terms
    const whereClause = searchTerms
      .map(() => '(LOWER(item_name) LIKE ? OR LOWER(description) LIKE ?)')
      .join(' AND ');

    const sqlQuery = `
      SELECT
        item_id,
        item_name,
        image_link,
        description,
        price
      FROM
        inventory
      WHERE
        ${whereClause};
    `;

    // Create parameter array for each search term
    const params = searchTerms.flatMap((term) => [`%${term}%`, `%${term}%`]);

    const searchResults = await executeSQLQuery(sqlQuery, params);

    return res.json(searchResults);
  } catch (error) {
    console.error('Error during search:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-to-cart', (req, res) => {
  const { custId, itemId, quantity } = req.body;

  // Validate that the required parameters are present
  if (!custId || !itemId || !quantity) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Insert into cart
  const insertQuery = 'INSERT INTO cart (cust_id, item_id, quantity) VALUES (?, ?, ?)';
  db.query(insertQuery, [custId, itemId, quantity], (err) => {
    if (err) {
      console.error('Error adding item to cart:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return success response
    return res.json({ success: true });
  });
});

app.get('/api/cart/:custid', (req, res) => {
  const custId = req.params.custid;
  console.log("In cart api: ", {custId});
  // Fetch cart items based on customer ID
  const query = `
    SELECT c.cust_id, c.item_id, i.item_name, i.image_link, i.price, c.quantity
    FROM cart c
    INNER JOIN inventory i ON c.item_id = i.item_id
    WHERE c.cust_id = ?;
  `;

  db.query(query, [custId], (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ error: 'Error fetching cart items' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/update-cart-quantity', (req, res) => {
  const { custId, itemId, quantity } = req.body;

  // Validate that the required parameters are present
  if (!custId || !itemId || !quantity) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Update the quantity in the cart
  const updateQuery = 'UPDATE cart SET quantity = ? WHERE cust_id = ? AND item_id = ?';
  db.query(updateQuery, [quantity, custId, itemId], (err) => {
    if (err) {
      console.error('Error updating cart quantity:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return success response
    return res.json({ success: true });
  });
});

app.post('/api/remove-from-cart', (req, res) => {
  const { custId, itemId } = req.body;

  // Validate that the required parameters are present
  if (!custId || !itemId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Delete the item from the cart
  const deleteQuery = 'DELETE FROM cart WHERE cust_id = ? AND item_id = ?';
  db.query(deleteQuery, [custId, itemId], (err) => {
    if (err) {
      console.error('Error removing item from cart:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return success response
    return res.json({ success: true });
  });
});

app.post('/api/checkout', (req, res) => {
  const { custId, cartItems } = req.body;

  // Validate that the required parameters are present
  if (!custId || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  // Perform the checkout process
  // Update inventory and clear cart entries (for simplicity, update inventory only)
  const updateInventoryQuery = 'UPDATE inventory SET item_quantity = item_quantity - ? WHERE item_id = ?';

  // Initialize order ID to 1 plus the max of all current order IDs
  let orderId;
  db.query('SELECT MAX(order_id) AS maxOrderId FROM order_history', (err, result) => {
    if (err) {
      console.error('Error getting max order ID:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

    orderId = result[0].maxOrderId + 1;

    // Process each item in the cart
    cartItems.forEach((item) => {
      db.query(updateInventoryQuery, [item.quantity, item.item_id], (err) => {
        if (err) {
          console.error('Error updating inventory during checkout:', err);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        // Insert entry into order_history table
        const orderHistoryQuery = 'INSERT INTO order_history (cust_id, order_id, item_id, order_date) VALUES (?, ?, ?, NOW())';
        db.query(orderHistoryQuery, [custId, orderId, item.item_id], (err) => {
          if (err) {
            console.error('Error inserting into order_history:', err);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
        });
      });
    });

    // Insert entry into order_status table
    const orderStatusQuery = 'INSERT INTO order_status (cust_id, order_id, status) VALUES (?, ?, "Delivered")';
    db.query(orderStatusQuery, [custId, orderId], (err) => {
      if (err) {
        console.error('Error inserting into order_status:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

      // Clear cart entries
      const clearCartQuery = 'DELETE FROM cart WHERE cust_id = ?';
      db.query(clearCartQuery, [custId], (err) => {
        if (err) {
          console.error('Error clearing cart entries during checkout:', err);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        // Return success response
        return res.json({ success: true });
      });
    });
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
