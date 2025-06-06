const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/me", authMiddleware, authController.getCurrentUser);

//refresh token
router.post("/refresh", authController.refresh);

module.exports = router;
