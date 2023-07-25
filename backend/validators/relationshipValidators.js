// backend/validators/relationshipValidators.js

const { body } = require('express-validator');

// Validator for creating a new relationship
const createRelationshipValidator = [
  body('tableA').notEmpty().withMessage('Table A is required'),
  body('tableB').notEmpty().withMessage('Table B is required'),
  body('relationshipType').notEmpty().withMessage('Relationship type is required'),
];

module.exports = {
  createRelationshipValidator,
};
