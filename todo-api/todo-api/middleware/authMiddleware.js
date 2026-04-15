// middleware/authMiddleware.js
// Middleware to protect routes — only logged-in users can access them

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/apiResponse");

/**
 * Protect Middleware
 * Verifies the JWT token sent in the Authorization header.
 * If valid, attaches the user object to req.user and calls next().
 * If invalid or missing, returns a 401 Unauthorized error.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  // Expected format: "Authorization: Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      // If the token is tampered or expired, this will throw an error
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID stored in the token payload
      // .select("-password") ensures password is NOT returned
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return errorResponse(res, 401, "User not found. Authorization denied.");
      }

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      // Token is invalid or expired
      return errorResponse(res, 401, "Not authorized. Invalid or expired token.");
    }
  }

  // No token found in the header
  if (!token) {
    return errorResponse(res, 401, "Not authorized. No token provided.");
  }
};

module.exports = { protect };
