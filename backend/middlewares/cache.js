// backend/middlewares/cache.js

const mcache = require('memory-cache');

// Middleware for caching responses
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      return res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000); // Convert duration to milliseconds
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
