const db = require('../config/db');
const bcrypt = require('bcrypt');

// User model
const User = {
  // Create users table if it doesn't exist
  createTable: async () => {
    try {
      const connection = await db.getConnection();
      const query = `
        CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      await connection.query(query);
      connection.release();
      console.log('Users table created or already exists');
    } catch (error) {
      console.error('Error creating users table:', error);
    }
  },

  // Find user by email
  findByEmail: async (email) => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },

  // Find user by username
  findByUsername: async (username) => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  },

  // Find user by ID
  findById: async (id) => {
    try {
      const [rows] = await db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Insert user into database
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [userData.username, userData.email, hashedPassword]
      );

      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

module.exports = User;