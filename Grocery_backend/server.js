// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'abhigyan',
  database: 'test',
});

app.use(cors());

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving data from the database' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
