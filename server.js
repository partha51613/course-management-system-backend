const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Course Management API is running...");
});

// API Versioning (Future-Proofing)
const apiV1Routes = require("./routes/v1/index");
app.use("/api/v1", apiV1Routes); // All v1 routes are prefixed with /api/v1

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
