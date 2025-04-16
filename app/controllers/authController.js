const db = require('../db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await db.query('SELECT id, name FROM users WHERE email = ? AND password_hash = ?', [email, password]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set a cookie with the user ID (or name)
        res.cookie('userId', results[0].id, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        });

        res.status(200).json({ message: 'Login successful', user: results[0] });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err });
    }
};

exports.getCurrentUser = async (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    try {
        const results = await db.query('SELECT id, name FROM users WHERE id = ?', [userId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: results[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, role, native_language, learning_language } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO users (name, email, password_hash, role, native_language, learning_language, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [name, email, password, role, native_language, learning_language]
        );

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId,
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err });
    }
};

