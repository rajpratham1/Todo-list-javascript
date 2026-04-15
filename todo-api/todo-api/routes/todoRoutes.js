// routes/todoRoutes.js
// Defines all todo-related API routes (all are protected)

const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");
const { todoValidation, validate } = require("../middleware/validateMiddleware");

// All routes below require authentication
// The 'protect' middleware is applied to every route in this file

// GET  /api/todos       → Get all todos for logged-in user
// POST /api/todos       → Create a new todo
router
  .route("/")
  .get(protect, getTodos)
  .post(protect, todoValidation, validate, createTodo);

// GET    /api/todos/:id → Get a specific todo
// PUT    /api/todos/:id → Update a specific todo
// DELETE /api/todos/:id → Delete a specific todo
router
  .route("/:id")
  .get(protect, getTodoById)
  .put(protect, todoValidation, validate, updateTodo)
  .delete(protect, deleteTodo);

module.exports = router;
