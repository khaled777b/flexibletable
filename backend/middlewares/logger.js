// backend/middlewares/logger.js

const fs = require('fs');
const path = require('path');

// Middleware to log request information
const logger = (req, res, next) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}\n`;
  
  // Specify the log file path
  const logFilePath = path.join(__dirname, '../logs/access.log');

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next();
};

module.exports = logger;
