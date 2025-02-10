const express = require('express');
const router = express.Router();

/*
* All v1 routes must be defined in this file. Then this bundle is imported into server.js
*/

//User Routes
const usersRoutes = require('./usersRoutes'); // Import users API
router.use('/users', usersRoutes);   // /api/v1/users

//Department Routes
const departmentsRoutes = require("./departmentsRoutes")
router.use('/departments', departmentsRoutes);   // /api/v1/departments

/*
* TO DO 
* Course Table Routes
* 
*/


module.exports = router;
