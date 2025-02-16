const db = require("../config/db");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken");

const otpStore = {}; // { email: { otp: "123456", expires: timestamp } }

/**
 * Generate a 6-digit OTP
 */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

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
  console.log("Req is " +JSON.stringify(this.requestOTP.body))
  try{
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const otp = generateOTP();
      otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry
  
      sendOTPEmail(email, otp);
      res.json({ message: "OTP sent to your email" });
    console.log("DOne")

    }
    catch(err){
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

  if (!otpStore[email]) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const storedOTP = otpStore[email];

  if (Date.now() > storedOTP.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email]; // OTP used, remove it

  // Generate JWT Token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};
