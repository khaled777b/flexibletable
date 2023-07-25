// backend/utils/errorHandler.js

// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error status and message
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Check for specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message;
  }

  // Send error response
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
