const express = require("express");
const db = require("../../config/db");
const router = express.Router();
//Enable Route Authorization
// const validateAuthToken = require("../../middlewares/validateAuthToken")
// router.use(validateAuthToken)


/**
 * @route   GET /api/v1/departments
 * @desc    Get all departments
 * @access  Public
 */

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM departments");

    if (!result || result.length === 0) {
      return res.status(200).json({
        message: "No departments found",
        data: [],
      });
    }

    res.status(200).json({
      message: "Departments retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Could not retrieve departments",
      details: err.message,
    });
  }
});


/**
 * @route   GET /api/v1/departments/:id
 * @desc    Get a department by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM departments WHERE id = ?",
      [req.params.id]
    );

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({
      message: "Department retrieved successfully",
      data: result, // Return a single object
    });
  } catch (err) {
    console.error("Error fetching department:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Could not retrieve department",
      details: err.message,
    });
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
  const { id } = req.params;
  const { name, email, phone, type } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !type) {
    return res.status(400).json({ error: "Missing required fields: name, email, phone, and type" });
  }

  try {
    const result = await db.query(
      "UPDATE departments SET name = ?, email = ?, phone = ?, type = ? WHERE id = ?",
      [name, email, phone, type, id]
    );

    // Check if any rows were updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found or no changes made" });
    }

    return res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    console.error("Error updating department:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Could not update department",
      details: err.message,
    });
  }
});


/**
 * @route   DELETE /api/v1/departments/:id
 * @desc    Delete a department
 * @access  Public
 */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: "Department ID is required" });
    }

    // Delete the department
    const result = await db.query("DELETE FROM departments WHERE id = ?", [id]);

    // Check if deletion was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });

  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Could not delete department",
      details: err.message,
    });
  }
});


module.exports = router;
