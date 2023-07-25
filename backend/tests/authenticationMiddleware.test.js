const assert = require('assert');
const sinon = require('sinon');
const { authenticationMiddleware } = require('../middlewares/authentication');

// Mock Express Request and Response objects
const req = {};
const res = {};

// Mock next function
const next = sinon.spy();

// Test Authentication Middleware
describe('Authentication Middleware', () => {
  it('should call next if authentication succeeds', () => {
    // Mock user data in the request object
    req.user = {
      id: 'user-id-123',
      name: 'John Doe',
      role: 'admin',
    };

    // Call the authentication middleware
    authenticationMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);
  });

  it('should return 401 if authentication fails', () => {
    // No user data in the request object (authentication failed)
    req.user = undefined;

    // Call the authentication middleware
    authenticationMiddleware(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 401 Unauthorized
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.statusMessage, 'Unauthorized');
  });
});
