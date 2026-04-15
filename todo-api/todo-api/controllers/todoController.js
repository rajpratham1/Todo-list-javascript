// controllers/todoController.js
// Handles all CRUD operations for Todos

const Todo = require("../models/Todo");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// ========================
// @desc    Get all todos for logged-in user
// @route   GET /api/todos
// @access  Private
// ========================
const getTodos = async (req, res) => {
  try {
    // Only fetch todos that belong to the currently logged-in user
    // req.user._id comes from the protect middleware
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

    return successResponse(res, 200, "Todos fetched successfully.", {
      count: todos.length,
      todos,
    });
  } catch (error) {
    console.error("GetTodos Error:", error.message);
    return errorResponse(res, 500, "Failed to fetch todos.");
  }
};

// ========================
// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
// ========================
const createTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Create todo and associate it with the logged-in user
    const todo = await Todo.create({
      user: req.user._id, // Link this todo to the current user
      title,
      description,
      priority,
    });

    return successResponse(res, 201, "Todo created successfully!", todo);
  } catch (error) {
    console.error("CreateTodo Error:", error.message);
    return errorResponse(res, 500, "Failed to create todo.");
  }
};

// ========================
// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
// ========================
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;

    // Find the todo by ID
    let todo = await Todo.findById(req.params.id);

    // Check if todo exists
    if (!todo) {
      return errorResponse(res, 404, "Todo not found.");
    }

    // Authorization check: make sure the todo belongs to the logged-in user
    if (todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, "You are not authorized to update this todo.");
    }

    // Update only the fields that were provided
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority },
      {
        new: true,      // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    return successResponse(res, 200, "Todo updated successfully!", todo);
  } catch (error) {
    console.error("UpdateTodo Error:", error.message);
    return errorResponse(res, 500, "Failed to update todo.");
  }
};

// ========================
// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
// ========================
const deleteTodo = async (req, res) => {
  try {
    // Find the todo by ID
    const todo = await Todo.findById(req.params.id);

    // Check if todo exists
    if (!todo) {
      return errorResponse(res, 404, "Todo not found.");
    }

    // Authorization: make sure the todo belongs to the logged-in user
    if (todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, "You are not authorized to delete this todo.");
    }

    // Delete the todo
    await todo.deleteOne();

    return successResponse(res, 200, "Todo deleted successfully!");
  } catch (error) {
    console.error("DeleteTodo Error:", error.message);
    return errorResponse(res, 500, "Failed to delete todo.");
  }
};

// ========================
// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
// @access  Private
// ========================
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return errorResponse(res, 404, "Todo not found.");
    }

    // Authorization check
    if (todo.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, "You are not authorized to view this todo.");
    }

    return successResponse(res, 200, "Todo fetched successfully.", todo);
  } catch (error) {
    console.error("GetTodoById Error:", error.message);
    return errorResponse(res, 500, "Failed to fetch todo.");
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, getTodoById };
