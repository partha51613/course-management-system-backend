const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // Import database configuration

/**
 * GET all courses
 * Endpoint: GET /api/v1/courses
 * Description: Fetches all courses from the database
 */

router.get("/", async (req, res) => {
    try {
      const courses = await db.query("SELECT * FROM courses");
      res.json(courses);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }
  });


/**
 * @route   GET /api/v1/courses/:id
 * @desc    Get a course by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
    try {
        const [courses] = await db.query(
          "SELECT * FROM courses WHERE id = ?",
          [req.params.id]
        ); // Pass as an array to avoid SQL injection
        if (!courses) {
          return res.status(404).json({ error: "Course not found" });
        }
        res.json(courses); // Return a single object instead of an array
      } catch (err) {
        res
          .status(500)
          .json({ error: "Internal Server Error", details: err.message });
      }
  });

/**
 * @route   POST /api/v1/courses
 * @desc    Create a new department
 * @access  Public
 */

router.post("/", async (req, res) => {
    const { name, duration_week, department_id } = req.body;
  
    if (!name || !duration_week || !department_id) {
      return res
        .status(400)
        .json({ error: "One of the necessary field is missing" });
    }
  
    try {
      const result = await db.query(
        "INSERT INTO courses (name, duration_week, department_id) VALUES (?,?,?)",
        [name, duration_week, department_id]
      );
      // `result.affectedRows` contains the count of updated rows
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Course not found or no changes made" });
      }
      res.json({
        id: result.insertId,
        message: "Course created successfully",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;