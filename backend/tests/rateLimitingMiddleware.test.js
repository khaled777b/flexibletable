const assert = require('assert');
const sinon = require('sinon');
const { rateLimitingMiddleware } = require('../middlewares/rateLimiting');

// Mock Express Request and Response objects
const req = {
  ip: '127.0.0.1',
};
const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Test Rate Limiting Middleware
describe('Rate Limiting Middleware', () => {
  it('should allow the request if rate limit is not exceeded', () => {
    // Mock the rate limiter to return false (rate limit not exceeded)
    const rateLimiter = {
      checkRateLimit: () => false,
    };

    // Call the rate limiting middleware
    rateLimitingMiddleware(rateLimiter)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);
  });

  it('should return 429 if rate limit is exceeded', () => {
    // Mock the rate limiter to return true (rate limit exceeded)
    const rateLimiter = {
      checkRateLimit: () => true,
    };

    // Call the rate limiting middleware
    rateLimitingMiddleware(rateLimiter)(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 429 Too Many Requests
    assert(res.status.calledWith(429));
    assert(res.json.calledWith({ message: 'Too Many Requests' }));
  });
});
