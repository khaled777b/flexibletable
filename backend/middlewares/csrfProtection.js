// backend/middlewares/csrfProtection.js

const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Middleware for CSRF protection
const csrfProtection = csrf({ cookie: true });

module.exports = { csrfProtection, cookieParser };
