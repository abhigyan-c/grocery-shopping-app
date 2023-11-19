// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'meet1180',   //change this password according to loacl your machine
  database: 'grocery',
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests


app.get('/', (req, res) => {
  res.send('Welcome to the Grocery App API'); // You can customize this response
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
