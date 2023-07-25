const { body } = require('express-validator');

// Validation rules for creating a data version
exports.createDataVersionRules = [
  body('data.field1').notEmpty().withMessage('Field1 is required.'),
  body('data.field2').isString().withMessage('Field2 must be a string.'),
  // Add more validation rules as needed for other fields
];

// Validation rules for updating a data version
exports.updateDataVersionRules = [
  body('data.field1').notEmpty().withMessage('Field1 is required.'),
  body('data.field2').isString().withMessage('Field2 must be a string.'),
  // Add more validation rules as needed for other fields
];
