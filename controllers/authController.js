const db = require("../config/db");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken");

let otpStore = {}; // { email: { otp: "123456", expires: timestamp } }

/**
 * Generate a 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


/**
 * Send OTP via Email
 */
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * Request OTP
 */
exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = ?", email);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = generateOTP();
    otpStore = {
      "email": email,
      "otp": otp,
      "expires": Date.now() + 5 * 60 * 1000
    }; // 5 min expiry
    sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to your email" });

  }
  catch (err) {
    res.status(500).json({
      "message": "Internal Server Error",
    })
  }
}

/**
 * Verify OTP and Generate JWT
 */
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  // console.debug("Req.body is " + JSON.stringify(req.body))

  if (!otpStore.expires) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  if (Date.now() > otpStore.expires) {
    delete otpStore.email;
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otpStore.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore.otp; // OTP used, remove it

  // Generate JWT Token
  const token = jwt.sign(
    { email: email }, // Payload object with email key-value pair
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );
  res.json({ message: "Login successful", token });
};
