const User = require("../models/userModel");
const {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const bcrypt = require("bcrypt");

const authController = {
  // Refresh user's token
  refresh: (req, res) => {
    try {
      const token = req.cookies["refresh_token"];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No refresh token",
        });
      }

      const payload = verifyRefreshToken(token); // Verify the refresh token
      const newAccessToken = generateToken(payload.id); // Generate new access token

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict", // or "lax" depending on your setup
        secure: process.env.COOKIE_SECURE === "true", // true in production with HTTPS
      });

      res.json({ success: true });
    } catch (err) {
      console.error("Refresh token error:", err);
      return res.status(401).json({
        success: false,
        message: "Refresh failed",
      });
    }
  },

  // Register a new user
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide username, email and password",
        });
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      const userId = await User.create({ username, email, password });

      const accessToken = generateToken(userId);
      const refreshToken = generateRefreshToken(userId);

      // Set refresh token cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      // Set access token cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
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

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const accessToken = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Set refresh token
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      // Set access token
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict",
        secure: process.env.COOKIE_SECURE === "true",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        // token: accessToken,
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
      const userId = req.user.id;
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
