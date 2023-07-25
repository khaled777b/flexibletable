const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

// Test User Registration
describe('User Registration', () => {
  it('should register a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    const response = await request(app).post('/api/users/register').send(userData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.username, userData.username);
    assert.strictEqual(response.body.email, userData.email);

    const user = await User.findOne({ email: userData.email });
    assert(user);
    assert.strictEqual(user.username, userData.username);
  });

  it('should not register a user with an existing username or email', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'existingpassword',
    };
    await User.create(existingUser);

    const newUserWithExistingUsername = {
      username: 'existinguser',
      email: 'newuser@example.com',
      password: 'newuserpassword',
    };

    const newUserWithExistingEmail = {
      username: 'newuser',
      email: 'existinguser@example.com',
      password: 'newuserpassword',
    };

    const response1 = await request(app).post('/api/users/register').send(newUserWithExistingUsername);
    const response2 = await request(app).post('/api/users/register').send(newUserWithExistingEmail);

    assert.strictEqual(response1.status, 400);
    assert.strictEqual(response2.status, 400);
    assert.strictEqual(response1.body.message, 'User with this username or email already exists.');
    assert.strictEqual(response2.body.message, 'User with this username or email already exists.');
  });
});

// Test User Update
describe('User Update', () => {
  it('should update an existing user', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'existingpassword',
    };
    const newUserDetails = {
      username: 'newusername',
      email: 'newuser@example.com',
    };
    const user = await User.create(existingUser);

    const response = await request(app).put(`/api/users/${user._id}`).send(newUserDetails);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.username, newUserDetails.username);
    assert.strictEqual(response.body.email, newUserDetails.email);

    const updatedUser = await User.findById(user._id);
    assert.strictEqual(updatedUser.username, newUserDetails.username);
    assert.strictEqual(updatedUser.email, newUserDetails.email);
  });

  it('should return an error when trying to update a non-existent user', async () => {
    const nonExistentUserId = 'non-existent-user-id';
    const newUserDetails = {
      username: 'newusername',
      email: 'newuser@example.com',
    };

    const response = await request(app).put(`/api/users/${nonExistentUserId}`).send(newUserDetails);
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'User not found.');
  });
});

// Test User Deletion
describe('User Deletion', () => {
  it('should delete an existing user', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existinguser@example.com',
      password: 'existingpassword',
    };
    const user = await User.create(existingUser);

    const response = await request(app).delete(`/api/users/${user._id}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'User deleted.');

    const deletedUser = await User.findById(user._id);
    assert.strictEqual(deletedUser, null);
  });

  it('should return an error when trying to delete a non-existent user', async () => {
    const nonExistentUserId = 'non-existent-user-id';

    const response = await request(app).delete(`/api/users/${nonExistentUserId}`);
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'User not found.');
  });
});
