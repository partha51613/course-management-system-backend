const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // Import database configuration

/**
 * GET all users
 * Endpoint: GET /api/v1/users
 * Description: Fetches all users from the database
 */

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users");

        if (!result || result.length === 0) {
            return res.status(200).json({
                message: "No users found",
                data: [],
            });
        }

        res.status(200).json({
            message: "Users retrieved successfully",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not retrieve users",
            details: err.message,
        });
    }
});


/**
 * GET user by ID
 * Endpoint: GET /api/v1/users/:id
 * Description: Fetches a single user by ID
 */

router.get("/:id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            data: result[0]
        });

    } catch (err) {
        console.error("Error retrieving user:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not retrieve user",
            details: err.message
        });
    }
});


/**
 * POST (Create a new user)
 * Endpoint: POST /api/v1/users
 * Description: Adds a new user to the database
 */

router.post("/", async (req, res) => {
    const { name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !role || !gender || !bank_name || !bank_ac_no || !bank_ifsc || !bank_address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await db.query(
            "INSERT INTO users (name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address]
        );

        if (result.affectedRows === 1) {
            return res.status(201).json({
                id: result.insertId,
                message: "User created successfully",
            });
        } else {
            return res.status(500).json({ error: "Failed to create user" });
        }
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not create user",
            details: err.message,
        });
    }
});


/**
 * PUT (Update an existing user)
 * Endpoint: PUT /api/v1/users/:id
 * Description: Updates user details based on ID
 */

router.put("/:id", async (req, res) => {
    const { name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address } = req.body;

    try {
        const result = await db.query(
            "UPDATE users SET name = ?, email = ?, phone = ?, alt_phone = ?, role = ?, gender = ?, bank_name = ?, bank_ac_no = ?, bank_ifsc = ?, bank_address = ? WHERE id = ?",
            [name, email, phone, alt_phone, role, gender, bank_name, bank_ac_no, bank_ifsc, bank_address, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not update user",
            details: err.message,
        });
    }
});


/**
 * DELETE a user
 * Endpoint: DELETE /api/v1/users/:id
 * Description: Deletes a user from the database by ID
 */

router.delete("/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not delete user",
            details: err.message,
        });
    }
});


module.exports = router;