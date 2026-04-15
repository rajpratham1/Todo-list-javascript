// utils/generateToken.js
// Utility function to generate JWT tokens

const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for a given user ID
 * @param {string} id - The MongoDB user ID
 * @returns {string} - Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign(
    { id }, // Payload: what we store inside the token
    process.env.JWT_SECRET, // Secret key to sign the token
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // Token expiry time
  );
};

module.exports = generateToken;
