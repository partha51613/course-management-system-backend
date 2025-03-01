const express = require('express');
const router = express.Router();

/*
* All v1 routes must be defined in this file. Then this bundle is imported into server.js
*/

// Users Routes
const usersRoutes = require('./usersRoutes'); // Import users API
router.use('/users', usersRoutes);   // /api/v1/users

// Departments Routes
const departmentsRoutes = require("./departmentsRoutes");
router.use('/departments', departmentsRoutes);   // /api/v1/departments

// Courses Routes
const coursesRoutes = require("./coursesRoutes");
router.use('/courses', coursesRoutes);   // /api/v1/departments

// Course_Sessions Routes
const courseSessionRoutes = require("./courseSessionRoutes");
router.use('/course-sessions', courseSessionRoutes)

// Auth Routes
const authRoutes = require("../v1/authRoutes");
router.use('/auth', authRoutes);

module.exports = router;
