const express = require("express");
const { requestOTP, verifyOTP } = require("../../controllers/authController");

const router = express.Router();

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);



// router.post("/requestotp", (req,res) => {
//     console.log("Requesting")
// });

module.exports = router;