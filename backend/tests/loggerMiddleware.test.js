const assert = require('assert');
const sinon = require('sinon');
const { loggerMiddleware } = require('../middlewares/logger');

// Mock Express Request and Response objects
const req = {
  method: 'GET',
  originalUrl: '/api/users',
};
const res = {};

// Mock next function
const next = sinon.spy();

// Test Logger Middleware
describe('Logger Middleware', () => {
  it('should log the request method and URL', () => {
    // Mock the console log method to capture the log
    const consoleLogStub = sinon.stub(console, 'log');

    // Call the logger middleware
    loggerMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the request method and URL are logged
    assert(consoleLogStub.calledWith(`[${req.method}] ${req.originalUrl}`));

    // Restore the console log method
    consoleLogStub.restore();
  });
});
