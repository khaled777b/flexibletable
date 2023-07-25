// backend/middlewares/sessionManagement.js

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

// Set up the MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/dynamic_table_app', // Replace with your MongoDB connection URI
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7, // Session will expire in 7 days
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

// Middleware for session management
const sessionMiddleware = session({
  secret: 'your_secret_key_here', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: false, // Set to true if using HTTPS in production
  },
});

module.exports = sessionMiddleware;
