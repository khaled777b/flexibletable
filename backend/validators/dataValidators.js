// backend/validators/dataValidators.js

const { body } = require('express-validator');

// Validator for creating a new data version
const createDataVersionValidator = [
  body('tableId').notEmpty().withMessage('Table ID is required'),
  body('data').notEmpty().withMessage('Data is required'),
];

// Validator for updating data in a table
const updateDataValidator = [
  body('data').notEmpty().withMessage('Data is required'),
];

module.exports = {
  createDataVersionValidator,
  updateDataValidator,
};
