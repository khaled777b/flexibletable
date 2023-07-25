const assert = require('assert');
const sinon = require('sinon');
const { requestValidationMiddleware } = require('../middlewares/requestValidation');

// Mock Express Request and Response objects
const req = {
  body: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
};
const res = {};

// Mock next function
const next = sinon.spy();

// Mock the request validation schema
const validationSchema = {
  name: {
    presence: true,
  },
  email: {
    email: true,
  },
  password: {
    length: {
      minimum: 8,
    },
  },
};

// Test Request Validation Middleware
describe('Request Validation Middleware', () => {
  it('should call next if request data is valid', () => {
    // Call the request validation middleware
    requestValidationMiddleware(validationSchema)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);
  });

  it('should return 422 if request data is invalid', () => {
    // Set invalid data in the request body
    req.body = {
      name: '', // Name is required
      email: 'invalid-email', // Invalid email format
      password: 'short', // Password must be at least 8 characters long
    };

    // Call the request validation middleware
    requestValidationMiddleware(validationSchema)(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 422 Unprocessable Entity
    assert.strictEqual(res.statusCode, 422);
    assert.strictEqual(res.statusMessage, 'Unprocessable Entity');
  });
});
