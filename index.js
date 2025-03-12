const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.render('home', { title: 'Lingolizer Home', message: 'Welcome to Lingolizer!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});