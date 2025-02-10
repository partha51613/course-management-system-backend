const express = require("express");
const db = require("../../config/db");

// Create a Router for /departments
const router = express.Router();

/**
 * @route   GET /api/v1/departments
 * @desc    Get all departments
 * @access  Public
 */

router.get("/", async (req, res) => {
  try {
    const departments = await db.query("SELECT * FROM departments");
    res.json(departments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

/**
 * @route   GET /api/v1/departments/:id
 * @desc    Get a department by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
  try {
    const [department] = await db.query(
      "SELECT * FROM departments WHERE id = ?",
      [req.params.id]
    ); // Pass as an array to avoid SQL injection
    if (!department) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(department); // Return a single object instead of an array
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

/**
 * @route   POST /api/v1/departments
 * @desc    Create a new department
 * @access  Public
 */

router.post("/", async (req, res) => {
  const { name, email, phone, type, isActive, createdAt, updatedAt } = req.body;

  if (!name || !email || !phone || !type) {
    return res
      .status(400)
      .json({ error: "One of the necessary field is missing" });
  }

  try {
    const result = await db.query(
      "INSERT INTO departments (name,email,phone,type) VALUES (?,?,?,?)",
      [name, email, phone, type]
    );
    // `result.affectedRows` contains the count of updated rows
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Department not found or no changes made" });
    }
    res.json({
      id: result.insertId,
      message: "Department created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/v1/departments/:id
 * @desc    Update a department
 * @access  Public
 */
router.put("/:id", async (req, res) => {
  const { name, email, phone, type } = req.body;
  try {
    const result = await db.query(
      "UPDATE departments SET name=?, email=?, phone=?, type=? WHERE id = ?",
      [name, email, phone, type, req.params.id]
    );

    // `result.affectedRows` contains the count of updated rows
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Department not found or no changes made" });
    }
    res.json({ message: "Department updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   DELETE /api/v1/departments/:id
 * @desc    Delete a department
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM departments WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json({ message: 'Department deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
