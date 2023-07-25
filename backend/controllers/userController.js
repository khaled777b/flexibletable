const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWT_SECRET = process.env.JWT_SECRET;

// Passport Local Strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

// Controller function to create a new user
exports.createUser = async (username, email, password) => {
  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('User with this username or email already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);
    return { user: newUser, token };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('An error occurred while creating the user.');
  }
};
// Controller function to create a new user
exports.createUser = async (username, email, password) => {
  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('User with this username or email already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('An error occurred while creating the user.');
  }
};

// Controller function to update an existing user's details
exports.updateUser = async (userId, username, email) => {
  try {
    // Check if the user ID is valid and the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Update the user details
    existingUser.username = username;
    existingUser.email = email;
    await existingUser.save();
    return existingUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('An error occurred while updating the user.');
  }
};

// Controller function to delete an existing user
exports.deleteUser = async (userId) => {
  try {
    // Check if the user ID is valid and the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Delete the user
    await existingUser.remove();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('An error occurred while deleting the user.');
  }
};

// Controller function to fetch all users
exports.getAllUsers = async () => {
  try {
    // Fetch all users
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('An error occurred while fetching the users.');
  }
};

// Controller function to fetch a specific user by ID
exports.getUserById = async (userId) => {
  try {
    // Check if the user ID is valid and the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }
    return existingUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('An error occurred while fetching the user.');
  }
};

// Controller function to fetch a user by username
exports.getUserByUsername = async (username) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    return user; // Return the user document, including the hashed password
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error('An error occurred while fetching the user.');
  }
};


// Controller function to compare passwords
exports.comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error('Error comparing passwords:', err);
    throw new Error('An error occurred while comparing passwords.');
  }
};

module.exports = { ...exports };