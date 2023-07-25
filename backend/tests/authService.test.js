const assert = require('assert');
const AuthService = require('../services/authService');
const User = require('../models/user');

// Test User Registration
describe('User Registration', () => {
  it('should register a new user', async () => {
    const userData = {
      username: 'newuser',
      password: 'password123',
    };

    const registeredUser = await AuthService.registerUser(userData);
    assert.strictEqual(registeredUser.username, userData.username);

    const user = await User.findOne({ username: userData.username });
    assert(user);
    assert(user.comparePassword(userData.password)); // Check if password is correctly hashed and stored
  });

  it('should not register a user with an existing username', async () => {
    const existingUser = {
      username: 'existinguser',
      password: 'password123',
    };
    await User.create(existingUser);

    const response = await AuthService.registerUser(existingUser);
    assert.strictEqual(response, null);
  });
});

// Test User Login
describe('User Login', () => {
  it('should log in an existing user with correct credentials', async () => {
    const existingUser = {
      username: 'existinguser',
      password: 'password123',
    };
    await User.create(existingUser);

    const loggedInUser = await AuthService.loginUser(existingUser.username, existingUser.password);
    assert.strictEqual(loggedInUser.username, existingUser.username);
  });

  it('should not log in a user with incorrect credentials', async () => {
    const existingUser = {
      username: 'existinguser',
      password: 'password123',
    };
    await User.create(existingUser);

    const response = await AuthService.loginUser(existingUser.username, 'wrongpassword');
    assert.strictEqual(response, null);
  });
});
