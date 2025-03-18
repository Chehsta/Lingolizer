// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');  // Import user routes

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Lingolizer!');
});

// Middleware for parsing JSON requests
app.use(express.json());

// Use user routes for any requests that start with '/users'
app.use('/users', userRoutes);

// Start the server on port 3001
app.listen(3002, () => {
  console.log('Lingolizer server running at http://127.0.0.1:3001/');
});
