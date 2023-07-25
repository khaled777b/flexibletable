const assert = require('assert');
const RelationshipValidator = require('../validators/relationshipValidator');

// Test Relationship Validation
describe('Relationship Validation', () => {
  it('should validate a valid relationship object', () => {
    const validRelationship = {
      sourceTable: 'orders',
      targetTable: 'products',
      type: 'one-to-many',
      sourceColumn: 'customerId',
      targetColumn: 'customerId',
    };

    const validationResult = RelationshipValidator.validateRelationship(validRelationship);
    assert.strictEqual(validationResult.isValid, true);
    assert.strictEqual(validationResult.errors.length, 0);
  });

  it('should return errors for an invalid relationship object', () => {
    const invalidRelationship = {
      sourceTable: '', // Source table is required
      targetTable: '', // Target table is required
      type: 'invalid-type', // Invalid relationship type
      sourceColumn: '', // Source column is required
      targetColumn: '', // Target column is required
    };

    const validationResult = RelationshipValidator.validateRelationship(invalidRelationship);
    assert.strictEqual(validationResult.isValid, false);
    assert.strictEqual(validationResult.errors.length, 5);
    assert(validationResult.errors.includes('Source table is required'));
    assert(validationResult.errors.includes('Target table is required'));
    assert(validationResult.errors.includes('Invalid relationship type'));
    assert(validationResult.errors.includes('Source column is required'));
    assert(validationResult.errors.includes('Target column is required'));
  });
});
