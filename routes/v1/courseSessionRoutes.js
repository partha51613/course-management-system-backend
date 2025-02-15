const express = require("express");
const db = require("../../config/db");
const router = express.Router();

/**
 * @route   GET /api/v1/course-sessions
 * @desc    Get all course sessions
 * @access  Public
 */

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM course_sessions");

        // Ensure result is an array and check if it's empty
        if (!result || result.length === 0) {
            return res.status(200).json({
                message: "No course sessions found",
                data: [],
            });
        }

        return res.status(200).json({
            message: "Course sessions retrieved successfully",
            data: result, // Returning all course sessions
        });

    } catch (err) {
        console.error("Error fetching course sessions:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not retrieve course sessions",
            details: err.message, // Include detailed error message for debugging
        });
    }
});



/**
 * @route   GET /api/v1/course-sessions/:id
 * @desc    Get a specific course session by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM course_sessions WHERE id = ?",
            [req.params.id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                error: "Course Session not found",
                message: `No course session found with ID ${req.params.id}`
            });
        }

        res.status(200).json({
            message: "Course session retrieved successfully",
            data: result[0] // Return the single object instead of an array
        });

    } catch (err) {
        console.error("Error fetching course session:", err);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not retrieve course session",
            details: err.message
        });
    }
});


/**
 * @route   POST /api/v1/course-sessions
 * @desc    Create a new course session
 * @access  Public
 */

router.post('/', async (req, res) => {
    const { course_id, session_name, run_type } = req.body;

    // Validate required fields
    if (!course_id || !session_name || !run_type) {
        return res.status(400).json({
            error: "Bad Request",
            message: "One or more required fields are missing"
        });
    }

    try {
        // Insert into database
        const result = await db.query(
            "INSERT INTO course_sessions (course_id, session_name, run_type) VALUES (?, ?, ?)",
            [course_id, session_name, run_type]
        );

        // Return success response
        res.status(201).json({
            message: "Course Session created successfully",
            data: {
                id: result.insertId,
                course_id,
                session_name,
                run_type
            }
        });

    } catch (err) {
        console.error("Error creating course session:", err);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not create course session",
            details: err.message
        });
    }
});



/**
 * @route   PUT /api/v1/course-sessions/:id
 * @desc    Update a course session
 * @access  Public
 */

router.put('/:id', async (req, res) => {
    const { course_id, session_name, run_type } = req.body;

    // Validate required fields
    if (!course_id || !session_name || !run_type) {
        return res.status(400).json({
            error: "Bad Request",
            message: "One or more required fields are missing"
        });
    }

    try {
        // Update the course session
        const result = await db.query(
            "UPDATE course_sessions SET course_id = ?, session_name = ?, run_type = ? WHERE id = ?",
            [course_id, session_name, run_type, req.params.id]
        );

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Not Found",
                message: `No course session found with ID ${req.params.id}`
            });
        }

        // Return success response
        res.status(200).json({
            message: "Course session updated successfully",
            data: {
                id: req.params.id,
                course_id,
                session_name,
                run_type
            }
        });

    } catch (err) {
        console.error("Error updating course session:", err);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Could not update course session",
            details: err.message
        });
    }
});



/**
 * @route   DELETE /api/v1/course-sessions/:id
 * @desc    Delete a course session by ID
 * @access  Public
 */

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Invalid course session ID"
        });
    }

    try {
        // Execute delete query
        const result = await db.query(
            "DELETE FROM course_sessions WHERE id = ?",
            id // Wrap in array to prevent SQL injection
        );

        // Check if the course session exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Not Found",
                message: `No course session found with ID ${id}`
            });
        }

        // Return success response
        return res.status(200).json({
            message: "Course session deleted successfully",
            data: { id }
        });

    } catch (err) {
        console.error("Error deleting course session:", err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Could not delete course session",
            details: err.message
        });
    }
});


module.exports = router;