const assert = require('assert');
const UserValidator = require('../validators/userValidator');

// Test User Validation
describe('User Validation', () => {
  it('should validate a valid user object', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'admin',
    };

    const validationResult = UserValidator.validateUser(validUser);
    assert.strictEqual(validationResult.isValid, true);
    assert.strictEqual(validationResult.errors.length, 0);
  });

  it('should return errors for an invalid user object', () => {
    const invalidUser = {
      name: '', // Name is required
      email: 'invalid-email', // Invalid email format
      password: 'short', // Password must be at least 8 characters long
      role: 'invalid-role', // Invalid role value
    };

    const validationResult = UserValidator.validateUser(invalidUser);
    assert.strictEqual(validationResult.isValid, false);
    assert.strictEqual(validationResult.errors.length, 4);
    assert(validationResult.errors.includes('Name is required'));
    assert(validationResult.errors.includes('Invalid email format'));
    assert(validationResult.errors.includes('Password must be at least 8 characters long'));
    assert(validationResult.errors.includes('Invalid role value'));
  });
});
