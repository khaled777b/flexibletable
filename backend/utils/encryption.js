// backend/utils/encryption.js

const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of salt rounds for hashing

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

// Function to compare a password with its hash
const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error('Failed to compare password');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
