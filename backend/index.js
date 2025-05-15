const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const db = require("./src/config/db");
const registerSocketServer = require("./src/socket/socket");

const app = express();
const server = http.createServer(app);
const FRONTEND_URL = "http://localhost:5173";

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register Socket Server
registerSocketServer(server, FRONTEND_URL);

// Database connection and server start
const PORT = process.env.PORT || 5000;

db.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();

    require("./src/models/userModel").createTable();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
