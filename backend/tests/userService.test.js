const assert = require('assert');
const UserService = require('../services/userService');
const User = require('../models/user');

// Test Get User By ID
describe('Get User By ID', () => {
  it('should retrieve a user by ID', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };
    const user = await User.create(userData);

    const retrievedUser = await UserService.getUserById(user._id);
    assert.strictEqual(retrievedUser.username, userData.username);
    assert.strictEqual(retrievedUser.password, userData.password); // Password should be hashed
  });

  it('should return null for a non-existent user ID', async () => {
    const nonExistentUserId = 'non-existent-user-id';

    const retrievedUser = await UserService.getUserById(nonExistentUserId);
    assert.strictEqual(retrievedUser, null);
  });
});

// Test Update User
describe('Update User', () => {
  it('should update a user with new data', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };
    const user = await User.create(userData);

    const updatedUserData = {
      username: 'updateduser',
      password: 'updatedpassword',
    };

    const updatedUser = await UserService.updateUser(user._id, updatedUserData);
    assert.strictEqual(updatedUser.username, updatedUserData.username);
    assert.strictEqual(updatedUser.password, updatedUserData.password); // Password should be updated and hashed
  });

  it('should return null for updating a non-existent user', async () => {
    const nonExistentUserId = 'non-existent-user-id';
    const updatedUserData = {
      username: 'updateduser',
      password: 'updatedpassword',
    };

    const updatedUser = await UserService.updateUser(nonExistentUserId, updatedUserData);
    assert.strictEqual(updatedUser, null);
  });
});

// Test Delete User
describe('Delete User', () => {
  it('should delete a user', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };
    const user = await User.create(userData);

    await UserService.deleteUser(user._id);

    const deletedUser = await User.findById(user._id);
    assert.strictEqual(deletedUser, null);
  });

  it('should return null for deleting a non-existent user', async () => {
    const nonExistentUserId = 'non-existent-user-id';

    const deletedUser = await UserService.deleteUser(nonExistentUserId);
    assert.strictEqual(deletedUser, null);
  });
});
