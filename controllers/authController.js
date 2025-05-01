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
  
  // Rate limiting or checks could go here to limit OTP requests

  try {
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    };

    await sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Error in requestOTP:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Verify OTP and Generate JWT
 */
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];
  if (!record || !record.expires) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  if (Date.now() > record.expires) {
    delete otpStore[email]; // Delete expired OTP
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP is valid, delete it from otpStore
  delete otpStore[email];

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Shorter expiry for added security

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Only true when HTTPS
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.json({ message: "Login successful", token });
};

/**
 * Logout - clears the JWT cookie
 */
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Only true when HTTPS
    sameSite: "strict",
    path: '/' // Ensure it's cleared across the entire domain
  });

  res.status(200).json({ message: "Logout successful" });
};
