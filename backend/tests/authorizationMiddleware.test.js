const assert = require('assert');
const sinon = require('sinon');
const { authorizationMiddleware } = require('../middlewares/authorization');

// Mock Express Request and Response objects
const req = {};
const res = {};

// Mock next function
const next = sinon.spy();

// Test Authorization Middleware
describe('Authorization Middleware', () => {
  it('should call next if user has the required role', () => {
    // Mock user data in the request object
    req.user = {
      id: 'user-id-123',
      name: 'John Doe',
      role: 'admin',
    };

    // Mock the required role for the route
    const requiredRole = 'admin';

    // Call the authorization middleware
    authorizationMiddleware(requiredRole)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);
  });

  it('should return 403 if user does not have the required role', () => {
    // Mock user data in the request object
    req.user = {
      id: 'user-id-123',
      name: 'John Doe',
      role: 'regular', // User role is not admin
    };

    // Mock the required role for the route
    const requiredRole = 'admin';

    // Call the authorization middleware
    authorizationMiddleware(requiredRole)(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 403 Forbidden
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.statusMessage, 'Forbidden');
  });
});
