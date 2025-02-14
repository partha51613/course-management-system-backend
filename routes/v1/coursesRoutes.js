const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // Import database configuration

/**
 * GET all courses
 * Endpoint: GET /api/v1/courses
 * Description: Fetches all courses from the database
 */

/**
 * GET all courses
 * Endpoint: GET /api/v1/courses
 * Description: Fetches all courses from the database
 */

router.get("/", async (req, res) => {
  try {

    const rows = await db.query("SELECT * FROM courses");

    // Check if courses exist
    if (rows.length === 0) {
      return res.status(204).json({
        message: "No courses found",
        data: []
      });
    }

    // Return the list of courses
    return res.status(200).json({
      message: "Courses retrieved successfully",
      data: rows,
    });

  } catch (err) {
    console.error("Error fetching courses:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Could not retrieve courses",
      details: err.message,
    });
  }
});


/**
 * @route   GET /api/v1/courses/:id
 * @desc    Get a course by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
  try {
    const courseId = parseInt(req.params.id, 10);

    // Validate ID
    if (isNaN(courseId) || courseId <= 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Invalid course ID ${courseId}`,
      });
    }

    // Fetch course from the database
    const [rows] = await db.query(
      "SELECT * FROM courses WHERE id = ?",
      [courseId]
    );

    // Check if course exists
    if (!rows || rows.length === 0) {
      return res.status(404).json({
        message: `No course found with id ${courseId}`,
        data: []
      });
    }

    // Return the course object
    return res.status(200).json({
      message: "Course retrieved successfully",
      data: rows, // Return single course object
    });

  } catch (err) {
    console.error("Error fetching course:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Could not retrieve course",
      details: err.message,
    });
  }
});


/**
 * @route   POST /api/v1/courses
 * @desc    Create a new department
 * @access  Public
 */

router.post("/", async (req, res) => {
  const { name, duration_week, department_id } = req.body;

  // Validate input
  if (!name || !duration_week || !department_id) {
    return res.status(400).json({ error: "One or more required fields are missing" });
  }

  try {
    // Insert the course
    const result = await db.query(
      "INSERT INTO courses (name, duration_week, department_id) VALUES (?, ?, ?)",
      [name, duration_week, department_id]
    );

    // Check if insertion was successful
    if (result.affectedRows === 1) {
      return res.status(201).json({
        message: "Course inserted successfully",
        course_id: result.insertId, // Return the newly inserted course ID
      });
    }

    return res.status(500).json({ error: "Failed to insert course" });

  } catch (err) {
    console.error("Error inserting course:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Could not insert course",
      details: err.message, // Send the actual error message for debugging
    });
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

  // Validate input
  if (!name || !duration_week || !department_id) {
    return res.status(400).json({ error: "One or more required fields are missing" });
  }

  try {
    // Update the course
    const result = await db.query(
      "UPDATE courses SET name = ?, duration_week = ?, department_id = ? WHERE id = ?",
      [name, duration_week, department_id, id]
    );

    // Check if the course exists and was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found or no changes made" });
    }

    // Fetch the updated course
    const updatedCourse = await db.query("SELECT * FROM courses WHERE id = ?", [id]);

    return res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse.length > 0 ? updatedCourse[0] : null, // Return updated course details
    });

  } catch (err) {
    console.error("Error updating course:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Could not update course",
      details: err.message, // Send the actual error message for debugging
    });
  }
});



/**
 * @route   DELETE /api/v1/courses/:id
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