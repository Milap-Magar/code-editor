const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// Import routes
const authRoutes = require("./src/routes/authRoutes");

// Import database connection
const db = require("./src/config/db");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow sending cookies
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);

// Serve the main application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Test database connection
db.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();

    // Create tables if they don't exist
    require("./src/models/userModel").createTable();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
