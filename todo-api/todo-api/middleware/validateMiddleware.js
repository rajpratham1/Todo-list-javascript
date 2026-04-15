// middleware/validateMiddleware.js
// Input validation rules using express-validator

const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/apiResponse");

// ========================
// Validation Rules
// ========================

// Rules for user registration
const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Rules for user login
const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

// Rules for creating/updating a todo
const todoValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Todo title is required")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high"),
];

// ========================
// Validation Result Handler
// ========================
// Run this after the validation rules to check for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return the first validation error message
    const firstError = errors.array()[0].msg;
    return errorResponse(res, 400, firstError);
  }

  next(); // No errors, proceed to controller
};

module.exports = {
  registerValidation,
  loginValidation,
  todoValidation,
  validate,
};
