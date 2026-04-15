// server.js
// Entry point of the application — sets up Express server and connects to DB

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ========================
// Load Environment Variables
// ========================
// Must be done before importing any file that uses process.env
dotenv.config();

// ========================
// Initialize Express App
// ========================
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: false }));

// ========================
// Connect to MongoDB (Non-blocking for Vercel)
// ========================
let dbConnected = false;

// Try to connect to MongoDB - don't block startup if it fails
connectDB().then((connected) => {
  dbConnected = connected;
  if (connected) {
    console.log("✅ MongoDB Connection initialized");
  } else {
    console.warn("⚠️  MongoDB not connected - API will be limited");
  }
});

// ========================
// Health Check & Status Route (JSON API)
// ========================
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Todo API is running!",
    version: "1.0.0",
    developer: "rajpratham1",
    github: "https://github.com/rajpratham1",
    database: dbConnected ? "✅ Connected" : "❌ Not Connected",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/me (Protected)",
      },
      todos: {
        getAll: "GET /api/todos (Protected)",
        getOne: "GET /api/todos/:id (Protected)",
        create: "POST /api/todos (Protected)",
        update: "PUT /api/todos/:id (Protected)",
        delete: "DELETE /api/todos/:id (Protected)",
      },
    },
  });
});

// ========================
// Documentation UI (Root & /docs)
// ========================
const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../api-docs.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "../../api-docs.html"));
});

// ========================
// API Routes
// ========================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

// ========================
// Error Handling Middleware
// ========================
// Must be AFTER all routes
app.use(notFound);     // Handle 404 - Route not found
app.use(errorHandler); // Handle all other errors

// ========================
// Start the Server
// ========================

// Export app for Vercel serverless functions
module.exports = app;

// Only start server in local development (not on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📡 API Health Check: http://localhost:${PORT}/`);
    console.log(`👨‍💻 Developer: rajpratham1 | GitHub: https://github.com/rajpratham1\n`);
  });
}
