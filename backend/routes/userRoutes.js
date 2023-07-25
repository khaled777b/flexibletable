const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authentication');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// User registration route (No token required)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user using the controller function
    const newUser = await userController.createUser(username, email, password);

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'An error occurred during user registration.' });
  }
});

// User login route (No token required)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch the user by username
    const user = await userController.getUserByUsername(username);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await userController.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'An error occurred during user login.' });
  }
});

// Fetch all users route (Token required)
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch all users using the controller function
    const users = await userController.getAllUsers();

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching the users.' });
  }
});

// Fetch a specific user by ID route (Token required)
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch a specific user by ID using the controller function
    const user = await userController.getUserById(userId);

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

// User update route (Token required)
router.put('/:userId', authenticate, async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.params.userId;

    // Check if the user ID is valid and the user exists
    const existingUser = await userController.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Update the user details
    const updatedUser = await userController.updateUser(userId, username, email);

    res.json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// User deletion route (Token required)
router.delete('/:userId', authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user ID is valid and the user exists
    const existingUser = await userController.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Delete the user
    await userController.deleteUser(userId);

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

module.exports = router;
