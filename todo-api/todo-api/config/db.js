// config/db.js
// Handles MongoDB connection using Mongoose

const mongoose = require("mongoose");

let isConnected = false;

/**
 * Connect to MongoDB database
 * Uses the MONGO_URI from environment variables
 */
const connectDB = async () => {
  // Skip if already connected
  if (isConnected) {
    console.log("✅ MongoDB Already Connected");
    return;
  }

  // Check if MONGO_URI is set
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI environment variable not set");
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Important for Vercel: don't keep connection alive indefinitely
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    isConnected = false;
    // Don't exit the process - let the app run anyway (for Vercel)
    return false;
  }
};

module.exports = connectDB;
