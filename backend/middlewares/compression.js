// backend/middlewares/compression.js

const compression = require('compression');

// Middleware to enable response compression
const enableCompression = compression();

module.exports = enableCompression;
