// controllers/authController.js
// Handles user registration and login logic

const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ========================
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ========================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, "Email is already registered. Please log in.");
    }

    // Create the new user in the database
    // Note: Password hashing happens automatically via the pre-save hook in the model
    const user = await User.create({ name, email, password });

    // Generate a JWT token for the new user
    const token = generateToken(user._id);

    // Send back user details and token
    return successResponse(res, 201, "Registration successful!", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return errorResponse(res, 500, "Registration failed. Please try again.");
  }
};

// ========================
// @desc    Login user and get token
// @route   POST /api/auth/login
// @access  Public
// ========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (include password field which is hidden by default)
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists AND password matches
    if (!user || !(await user.matchPassword(password))) {
      return errorResponse(res, 401, "Invalid email or password.");
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return successResponse(res, 200, "Login successful!", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return errorResponse(res, 500, "Login failed. Please try again.");
  }
};

// ========================
// @desc    Get current logged-in user profile
// @route   GET /api/auth/me
// @access  Private (requires JWT)
// ========================
const getMe = async (req, res) => {
  try {
    // req.user is attached by the 'protect' middleware
    const user = req.user;

    return successResponse(res, 200, "User profile fetched successfully.", {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("GetMe Error:", error.message);
    return errorResponse(res, 500, "Could not fetch profile.");
  }
};

module.exports = { registerUser, loginUser, getMe };
