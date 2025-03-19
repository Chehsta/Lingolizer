const express = require('express');
const path = require('path');

const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views')); // Adjust the path based on your structure

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files (CSS & JS)
app.use(express.static(path.join(__dirname, './public')));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Lingolizer!' });
});

// Route to render user list page
app.get('/users/list', (req, res) => {
    res.render('userList', { title: 'User List' });
});

// Route to render listing detail page
app.get('/listing/:id', (req, res) => {
    res.render('listingDetail', { title: 'Listing Detail' });
});

// Start the server on port 3002
app.listen(3002, () => {
    console.log('Lingolizer server running at http://127.0.0.1:3002/');
});
