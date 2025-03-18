// controllers/userController.js
const db = require('../db');  


// Fetch user by ID
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const results = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching user data', error: err });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const results = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const results = await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, userId]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating user', error: err });  // Complete the return statement
  }
};
