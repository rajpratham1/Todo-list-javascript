// utils/apiResponse.js
// Helper functions to send consistent API responses

/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Success message
 * @param {any} data - Data to send back
 */
const successResponse = (res, statusCode = 200, message = "Success", data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message - Error message
 */
const errorResponse = (res, statusCode = 500, message = "Server Error") => {
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { successResponse, errorResponse };
