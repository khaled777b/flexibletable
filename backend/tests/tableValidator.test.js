const assert = require('assert');
const TableValidator = require('../validators/tableValidator');

// Test Table Validation
describe('Table Validation', () => {
  it('should validate a valid table object', () => {
    const validTable = {
      name: 'Products',
      columns: [
        { name: 'Product Name', type: 'string' },
        { name: 'Price', type: 'number' },
      ],
    };

    const validationResult = TableValidator.validateTable(validTable);
    assert.strictEqual(validationResult.isValid, true);
    assert.strictEqual(validationResult.errors.length, 0);
  });

  it('should return errors for an invalid table object', () => {
    const invalidTable = {
      name: '', // Name is required
      columns: [
        { name: '', type: 'string' }, // Column name is required
        { name: 'Price', type: 'invalid-type' }, // Invalid column type
      ],
    };

    const validationResult = TableValidator.validateTable(invalidTable);
    assert.strictEqual(validationResult.isValid, false);
    assert.strictEqual(validationResult.errors.length, 3);
    assert(validationResult.errors.includes('Name is required'));
    assert(validationResult.errors.includes('Column name is required'));
    assert(validationResult.errors.includes('Invalid column type'));
  });
});
