// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  // Import controller

// Define routes for user-related requests
router.get("/", userController.getUsers);           // Fetch users
router.get('/:id', userController.getUser);         // Fetch user data by ID
router.post('/create', userController.createUser);  // Create a new user
router.put('/:id', userController.updateUser);      // Update user info

module.exports = router;
// controllers/userController.js