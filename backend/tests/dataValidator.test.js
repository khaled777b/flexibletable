const assert = require('assert');
const DataValidator = require('../validators/dataValidator');

// Test Data Validation
describe('Data Validation', () => {
  it('should validate a valid data object', () => {
    const validData = [
      { name: 'Product A', price: 100 },
      { name: 'Product B', price: 200 },
    ];

    const validationResult = DataValidator.validateData(validData);
    assert.strictEqual(validationResult.isValid, true);
    assert.strictEqual(validationResult.errors.length, 0);
  });

  it('should return errors for an invalid data object', () => {
    const invalidData = [
      { name: 'Product A', price: 100 },
      { name: '', price: 200 }, // Empty name is not allowed
    ];

    const validationResult = DataValidator.validateData(invalidData);
    assert.strictEqual(validationResult.isValid, false);
    assert.strictEqual(validationResult.errors.length, 1);
    assert(validationResult.errors.includes('Name is required'));
  });
});
