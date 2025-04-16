const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Route to get currently logged-in user
router.get('/me', authController.getCurrentUser);

// Registration route
router.post('/register', authController.register);

module.exports = router;
