const assert = require('assert');
const sinon = require('sinon');
const { sessionManagementMiddleware } = require('../middlewares/sessionManagement');

// Mock Express Request and Response objects
const req = {};
const res = {
  setHeader: sinon.spy(),
};

// Mock next function
const next = sinon.spy();

// Mock the session store
const sessionStore = {
  get: sinon.stub(),
  set: sinon.stub(),
  destroy: sinon.stub(),
};

// Test Session Management Middleware
describe('Session Management Middleware', () => {
  it('should initialize and set a new session', () => {
    const sessionId = 'random-session-id';

    // Mock the session store to return a new session ID
    sessionStore.get.returns(null);
    sessionStore.set.withArgs(sessionId).returns(true);

    // Call the session management middleware
    sessionManagementMiddleware(sessionStore)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the session ID is set in the response headers
    assert(res.setHeader.calledWith('Set-Cookie', `session=${sessionId}; HttpOnly; Secure; SameSite=Strict`));
  });

  it('should set the session data in the request object', () => {
    const sessionId = 'existing-session-id';
    const sessionData = { user: { id: 1, name: 'John Doe' } };

    // Mock the session store to return existing session data
    sessionStore.get.withArgs(sessionId).returns(sessionData);

    // Set the session ID in the request headers
    req.headers.cookie = `session=${sessionId}`;

    // Call the session management middleware
    sessionManagementMiddleware(sessionStore)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the session data is set in the request object
    assert.deepStrictEqual(req.session, sessionData);
  });

  it('should clear the session data on logout', () => {
    const sessionId = 'existing-session-id';

    // Set the session ID in the request headers
    req.headers.cookie = `session=${sessionId}`;

    // Call the session management middleware with logout flag
    sessionManagementMiddleware(sessionStore, true)(req, res, next);

    // Assert that next function is called
    assert(next.calledOnce);

    // Assert that the session data is cleared from the session store
    assert(sessionStore.destroy.calledWith(sessionId));

    // Assert that the session ID is cleared in the response headers
    assert(res.setHeader.calledWith('Set-Cookie', `session=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`));
  });
});
