const assert = require('assert');
const sinon = require('sinon');
const { corsMiddleware } = require('../middlewares/cors');

// Mock Express Request and Response objects
const req = {};
const res = {
  setHeader: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Test CORS Middleware
describe('CORS Middleware', () => {
  it('should set the appropriate CORS headers', () => {
    // Call the CORS middleware
    corsMiddleware(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the CORS headers are set
    assert(res.setHeader.calledWith('Access-Control-Allow-Origin', '*'));
    assert(res.setHeader.calledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'));
    assert(res.setHeader.calledWith('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'));
  });
});
