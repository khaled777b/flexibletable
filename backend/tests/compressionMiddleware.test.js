const assert = require('assert');
const sinon = require('sinon');
const { compressionMiddleware } = require('../middlewares/compression');

// Mock Express Request and Response objects
const req = {};
const res = {
  setHeader: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Test Compression Middleware
describe('Compression Middleware', () => {
  it('should set the appropriate compression headers', () => {
    // Call the compression middleware
    compressionMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the compression headers are set
    assert(res.setHeader.calledWith('Content-Encoding', 'gzip'));
  });
});
