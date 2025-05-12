const jwt = require("jsonwebtoken");

// Generate access token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret_key_here", // Use a separate secret for access tokens
    {
      expiresIn: "15m", // Token expires in 15 minutes for more security
    },
  );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_key_here", // Use a separate secret for refresh tokens
    {
      expiresIn: "7d", // Refresh token expires in 7 days
    },
  );
};

// Verify access token
const verifyToken = (token) => {
  try {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret_key_here",
    );
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null; // Return null if the token is invalid or expired
  }
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_key_here",
    );
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null; // Return null if the refresh token is invalid or expired
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
