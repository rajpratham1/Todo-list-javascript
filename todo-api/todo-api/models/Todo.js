// models/Todo.js
// Mongoose schema and model for Todo items

const mongoose = require("mongoose");

// Define the Todo Schema
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    completed: {
      type: Boolean,
      default: false, // New todos start as incomplete
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Only these values allowed
      default: "medium",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create and export the Todo model
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
