const User = require("../models/userModel");
const { generateToken, generateRefreshToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { verifyRefreshToken } = require("../utils/jwt");

// Authentication controller
const authController = {
  // Refresh user's token
  refresh: (req, res) => {
    try {
      const token = req.cookies["refresh_token"];
      if (!token)
        return res
          .status(401)
          .json({ success: false, message: "No refresh token" });

      const payload = verifyRefreshToken(token); // verify the refresh token
      const newAccessToken = generateToken(payload.id); // generate new access token

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      res.json({ success: true });
    } catch (err) {
      console.error("Refresh token error:", err);
      return res
        .status(401)
        .json({ success: false, message: "Refresh failed" });
    }
  },

  // Register a new user
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide username, email and password",
        });
      }

      // Check if username already exists
      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Check if email already exists
      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Create new user
      const userId = await User.create({ username, email, password });

      // Generate JWT token
      const token = generateToken(userId);

      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { id: userId, username, email },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate JWT tokens
      const accessToken = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Set refresh token in a secure, HttpOnly cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      // Set access token in a secure, HttpOnly cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during login",
      });
    }
  },

  // Logout user
  logout: (req, res) => {
    // Clear both token and refresh token cookies
    res.clearCookie("token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  },

  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      // User ID comes from the auth middleware
      const userId = req.user.id;

      // Get user data
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

module.exports = authController;
