// controllers/userController.js
const db = require('../db');

exports.getUsers = async (req, res) => {
    const { page = 1, limit = 10, search_name, search_language } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    try {
        // Base query and filters array
        let baseQuery = "SELECT id, name, native_language FROM users";
        let whereClauses = [];
        let params = [];

        // Optional filters
        if (search_name) {
            whereClauses.push("name LIKE ?");
            params.push(`%${search_name}%`);
        }

        if (search_language) {
            whereClauses.push("native_language = ?");
            params.push(search_language);
        }

        // Add WHERE clause if needed
        if (whereClauses.length > 0) {
            baseQuery += " WHERE " + whereClauses.join(" AND ");
        }

        // Count query for pagination
        let countQuery = "SELECT COUNT(*) AS count FROM users";
        if (whereClauses.length > 0) {
            countQuery += " WHERE " + whereClauses.join(" AND ");
        }

        // Add pagination to main query
        baseQuery += ` LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(offset, 10)}`;

        // Execute queries
        const results = await db.query(baseQuery, params);
        const totalUsersResult = await db.query(countQuery, params.slice(0, whereClauses.length));

        const totalUsers = totalUsersResult[0].count;

        if (results.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({
            users: results,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page, 10),
        });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching users", error: err });
    }
};



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
