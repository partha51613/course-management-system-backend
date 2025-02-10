const express = require('express');
const router = express.Router();
const db = require('../../config/db');


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]); // Pass as an array to avoid SQL injection
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user); // Return a single object instead of an array
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


// POST (Create new user)
router.post('/', async (req, res) => {
    const { name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address } = req.body;

    //Error Handling
    if (!name || !email || !phone || !role || !gender || !bank_name || !bank_ac_no || !bank_ifsc || !bank_address) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address]
        );

        // `result.affectedRows` contains the count of updated rows
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }
        res.json({ id: result.insertId, message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT (Update a user)
router.put('/:id', async (req, res) => {
    const { name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address } = req.body;

    try {
        const result = await db.query(
            'UPDATE users SET name=?, email=?, phone=?, alt_phone=?, role=?, gender=?, bank_name=?, bank_ac_no=?, bank_ifsc=?, bank_address=? WHERE id=?',
            [name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address, req.params.id]
        );

        // `result.affectedRows` contains the count of updated rows
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
