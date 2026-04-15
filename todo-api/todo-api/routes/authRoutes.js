// routes/authRoutes.js
// Defines all authentication-related API routes

const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middleware/validateMiddleware");

// ========================
// Public Routes
// ========================

// POST /api/auth/register
// Validate inputs → then register the user
router.post("/register", registerValidation, validate, registerUser);

// POST /api/auth/login
// Validate inputs → then log in the user
router.post("/login", loginValidation, validate, loginUser);

// ========================
// Protected Routes
// ========================

// GET /api/auth/me
// Must be logged in (protect middleware checks the JWT token)
router.get("/me", protect, getMe);

module.exports = router;
