const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views')); // Adjust the path based on your structure

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for cookies parsing
app.use(cookieParser());

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Serve static files (CSS & JS)
app.use(express.static(path.join(__dirname, './public')));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Lingolizer!' });
});


const { requireLogin, redirectIfLoggedIn } = require('./middleware/auth');

app.use('/auth', authRoutes);

app.get('/login', redirectIfLoggedIn, (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/register', redirectIfLoggedIn, (req, res) => {
    res.render('register', { title: 'Register' });
});


// Route to render user list page
app.get('/users/list', requireLogin, (req, res) => {
    res.render('userList', { title: 'User List' });
});

// Route to render listing detail page
app.get('/listing/:id', requireLogin, (req, res) => {
    res.render('listingDetail', { title: 'Listing Detail' });
});

// Start the server on port 3002
app.listen(3002, () => {
    console.log('Lingolizer server running at http://127.0.0.1:3002/');
});
