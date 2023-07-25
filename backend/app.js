const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middlewares
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const rateLimit = require('./middlewares/rateLimiting');
const { csrfProtection } = require('./middlewares/csrfProtection');
const enableCompression = require('./middlewares/compression');
const sessionMiddleware = require('./middlewares/sessionManagement');
const { authenticate } = require('./middlewares/authentication');

// Routers
const userRoutes = require('./routes/userRoutes');
const tableRoutes = require('./routes/tableRoutes');
const relationshipRoutes = require('./routes/relationshipRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const customViewRoutes = require('./routes/customViewRoutes');
//const dataVersionRoutes = require('./routes/dataVersionRoutes');

// Set up the MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
  expires: parseInt(process.env.SESSION_EXPIRY), // Session will expire in 7 days
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

// Set up the application
app.use(cors);
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit);
app.use(enableCompression);
app.use(sessionMiddleware);

// Authenticate User (JWT Authentication)
app.use(authenticate);

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tables', csrfProtection, tableRoutes);
app.use('/api/relationships', csrfProtection, relationshipRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/custom-views', customViewRoutes);
//app.use('/api/data-versions', csrfProtection, dataVersionRoutes);

// Error handling middleware (must be defined after all other routes and middlewares)
const errorHandler = require('./middlewares/errorHandling');
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
