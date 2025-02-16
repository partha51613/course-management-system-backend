const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // Use environment variables in production

function authenticateToken(req, res, next) {
    const token = req.headers.token; // Read token from cookies

    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });

    });
    next();
}

module.exports = authenticateToken;
