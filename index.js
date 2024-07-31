const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Create a MySQL connection pool using the connection URL
const pool = mysql.createPool(process.env.DATABASE_URL);

// Promisify for Node.js async/await.
const promisePool = pool.promise();

app.get('/', (req, res) => {
    res.json({ msg: 'Hello Moon' });
});

app.get('/attractions', async (req, res) => {
    try {
        const [results] = await promisePool.query('SELECT * FROM attractions');
        res.json(results);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/attractions/:id', async (req, res) => {
    try {
        const [results] = await promisePool.query('SELECT * FROM attractions');
        res.json(results);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
