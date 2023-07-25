// backend/middlewares/errorHandling.js

// Middleware to handle errors and send appropriate responses
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check for specific known errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Handle other unknown errors with a generic message
  return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
};

module.exports = errorHandler;
