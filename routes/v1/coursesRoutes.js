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



/**
 * @route   PUT /api/v1/courses/:id
 * @desc    Update a department
 * @access  Public
 */

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, duration_week, department_id } = req.body;

    if (!name || !duration_week || !department_id) {
        return res.status(400).json({ error: "One of the necessary fields is missing" });
    }

    try {
        const result = await db.query(
            "UPDATE courses SET name = ?, duration_week = ?, department_id = ? WHERE id = ?",
            [name, duration_week, department_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Course not found or no changes made" });
        }

        res.json({ message: "Course updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @route   PUT /api/v1/courses/:id
 * @desc    Delete a department
 * @access  Public
 */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const result = await db.query("DELETE FROM courses WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Course not found" });
      }

      res.json({ message: "Course deleted successfully" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



module.exports = router;