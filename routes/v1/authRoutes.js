const express = require("express");
const { requestOTP, verifyOTP } = require("../../controllers/authController");
//Enable Route Authorization
// const validateAuthToken = require("../../middlewares/validateAuthToken")
// router.use(validateAuthToken)

const router = express.Router();

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;