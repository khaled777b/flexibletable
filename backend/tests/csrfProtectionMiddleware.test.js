const assert = require('assert');
const sinon = require('sinon');
const { csrfProtectionMiddleware } = require('../middlewares/csrfProtection');

// Mock Express Request and Response objects
const req = {};
const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Test CSRF Protection Middleware
describe('CSRF Protection Middleware', () => {
  it('should generate and set CSRF token in response headers', () => {
    // Call the CSRF protection middleware
    csrfProtectionMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the CSRF token is set in the response headers
    assert(res.setHeader.calledWith('X-CSRF-Token'));
    assert(typeof res.getHeader('X-CSRF-Token') === 'string');
  });

  it('should validate CSRF token in request headers', () => {
    const csrfToken = 'random-csrf-token';

    // Set the CSRF token in the request headers
    req.headers['x-csrf-token'] = csrfToken;

    // Call the CSRF protection middleware
    csrfProtectionMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the CSRF token is validated
    assert(res.getHeader('X-CSRF-Token') === csrfToken);
  });

  it('should return 403 if CSRF token is missing in request headers', () => {
    // Call the CSRF protection middleware without setting the CSRF token
    csrfProtectionMiddleware(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 403 Forbidden
    assert(res.status.calledWith(403));
    assert(res.json.calledWith({ message: 'CSRF token missing or invalid' }));
  });

  it('should return 403 if CSRF token is invalid', () => {
    // Set an invalid CSRF token in the request headers
    req.headers['x-csrf-token'] = 'invalid-csrf-token';

    // Call the CSRF protection middleware
    csrfProtectionMiddleware(req, res, next);

    // Assert that next function is not called
    assert(next.notCalled);

    // Assert that the response status is 403 Forbidden
    assert(res.status.calledWith(403));
    assert(res.json.calledWith({ message: 'CSRF token missing or invalid' }));
  });
});
