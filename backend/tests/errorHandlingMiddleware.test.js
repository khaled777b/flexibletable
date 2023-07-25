const assert = require('assert');
const sinon = require('sinon');
const { errorHandlingMiddleware } = require('../middlewares/errorHandling');

// Mock Express Request and Response objects
const req = {};
const res = {};

// Mock next function
const next = sinon.spy();

// Test Error Handling Middleware
describe('Error Handling Middleware', () => {
  it('should call next if no error is present', () => {
    // Call the error handling middleware with no error
    errorHandlingMiddleware(undefined, req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);
  });

  it('should return 500 Internal Server Error for generic errors', () => {
    const genericError = new Error('Something went wrong');

    // Call the error handling middleware with a generic error
    errorHandlingMiddleware(genericError, req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 500 Internal Server Error
    assert.strictEqual(res.statusCode, 500);
    assert.strictEqual(res.statusMessage, 'Internal Server Error');
  });

  it('should return the specified status code and message for known errors', () => {
    const knownError = {
      message: 'User not found',
      statusCode: 404,
    };

    // Call the error handling middleware with a known error
    errorHandlingMiddleware(knownError, req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status and message match the known error
    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.statusMessage, 'User not found');
  });
});
