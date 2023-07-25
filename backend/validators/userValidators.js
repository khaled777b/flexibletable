// backend/validators/userValidators.js

const { body } = require('express-validator');

// Validator for creating a new user
const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validator for logging in a user
const loginUserValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  createUserValidator,
  loginUserValidator,
};
