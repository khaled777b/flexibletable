// backend/services/userService.js

const User = require('../models/User');

const userService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  // Find a user by ID
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  },

  // Find a user by email
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to get user by email');
    }
  },

  // Validate user credentials for login
  validateUserCredentials: async (email, password) => {
    try {
      const user = await userService.getUserByEmail(email);
      if (!user.comparePassword(password)) {
        throw new Error('Invalid password');
      }
      return user;
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },
};

module.exports = userService;
