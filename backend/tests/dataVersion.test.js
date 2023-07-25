const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const DataVersion = require('../models/dataVersion');

// Test Data Version Creation
describe('Data Version Creation', () => {
  it('should create a new data version', async () => {
    const versionData = {
      tableName: 'products',
      versionNumber: 1,
      data: [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
      ],
    };

    const response = await request(app).post('/api/data-versions').send(versionData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.tableName, versionData.tableName);
    assert.strictEqual(response.body.versionNumber, versionData.versionNumber);
    assert.deepStrictEqual(response.body.data, versionData.data);

    const dataVersion = await DataVersion.findOne({ tableName: versionData.tableName });
    assert(dataVersion);
    assert.strictEqual(dataVersion.versionNumber, versionData.versionNumber);
    assert.deepStrictEqual(dataVersion.data, versionData.data);
  });

  it('should not create a data version with missing fields', async () => {
    const invalidVersionData = {
      tableName: 'products',
      versionNumber: 1,
    };

    const response = await request(app).post('/api/data-versions').send(invalidVersionData);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Missing required fields.');
  });
});

// Test Data Version Retrieval
describe('Data Version Retrieval', () => {
  it('should retrieve all data versions for a table', async () => {
    const versionData1 = {
      tableName: 'products',
      versionNumber: 1,
      data: [
        { name: 'Product 1', price: 10 },
      ],
    };
    const versionData2 = {
      tableName: 'products',
      versionNumber: 2,
      data: [
        { name: 'Product 1', price: 15 },
        { name: 'Product 2', price: 20 },
      ],
    };
    await DataVersion.create(versionData1);
    await DataVersion.create(versionData2);

    const response = await request(app).get('/api/data-versions?tableName=products');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 2);

    const version1 = response.body[0];
    const version2 = response.body[1];
    assert.strictEqual(version1.tableName, versionData1.tableName);
    assert.strictEqual(version1.versionNumber, versionData1.versionNumber);
    assert.deepStrictEqual(version1.data, versionData1.data);
    assert.strictEqual(version2.tableName, versionData2.tableName);
    assert.strictEqual(version2.versionNumber, versionData2.versionNumber);
    assert.deepStrictEqual(version2.data, versionData2.data);
  });
});
