const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// User model - Replace this with your User model import
const User = require('../models/User');

// Serialize and deserialize user objects
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
