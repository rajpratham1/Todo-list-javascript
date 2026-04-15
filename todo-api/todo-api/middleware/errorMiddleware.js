// middleware/errorMiddleware.js
// Global error handling middleware for Express

/**
 * 404 Not Found Handler
 * Catches requests to undefined routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass error to the global error handler below
};

/**
 * Global Error Handler
 * Catches all errors passed via next(error) anywhere in the app
 * Must have 4 parameters to be recognized as error handler by Express
 */
const errorHandler = (err, req, res, next) => {
  // Sometimes Express sets 200 even for errors; default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Handle Mongoose CastError (invalid MongoDB ID format)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Handle Mongoose Duplicate Key Error (e.g., email already registered)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists. Please use a different ${field}.`,
    });
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // Generic error response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Show stack trace only in development (not in production)
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
