// backend/validators/tableValidators.js

const { body } = require('express-validator');

// Validator for creating a new table
const createTableValidator = [
  body('name').notEmpty().withMessage('Table name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

// Validator for updating table metadata
const updateTableValidator = [
  body('description').optional().isString().withMessage('Description must be a string'),
];

module.exports = {
  createTableValidator,
  updateTableValidator,
};
