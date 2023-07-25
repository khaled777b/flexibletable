const assert = require('assert');
const sinon = require('sinon');
const { cacheMiddleware } = require('../middlewares/cache');

// Mock Express Request and Response objects
const req = {
  originalUrl: '/api/users',
};
const res = {
  setHeader: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Mock the cache client
const cacheClient = {
  get: sinon.stub(),
  set: sinon.stub(),
};

// Test Cache Middleware
describe('Cache Middleware', () => {
  it('should retrieve data from cache and call next if data exists', () => {
    const cachedData = { data: [{ id: 1, name: 'John Doe' }] };

    // Mock the cache client to return cached data
    cacheClient.get.withArgs(req.originalUrl).returns(cachedData);

    // Call the cache middleware
    cacheMiddleware(cacheClient)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the response headers are set
    assert(res.setHeader.calledWith('X-Cache', 'HIT'));
    assert(res.setHeader.calledWith('X-Cache-Key', req.originalUrl));
  });

  it('should call next and save data to cache if data is not cached', () => {
    const responseData = { data: [{ id: 1, name: 'John Doe' }] };

    // Mock the cache client to return null (data not cached)
    cacheClient.get.withArgs(req.originalUrl).returns(null);

    // Call the cache middleware
    cacheMiddleware(cacheClient)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the response headers are set
    assert(res.setHeader.calledWith('X-Cache', 'MISS'));
    assert(res.setHeader.calledWith('X-Cache-Key', req.originalUrl));

    // Assert that the data is saved to cache
    assert(cacheClient.set.calledWith(req.originalUrl, responseData));
  });
});
