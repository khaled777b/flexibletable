const assert = require('assert');
const DataVersionService = require('../services/dataVersionService');
const DataVersion = require('../models/dataVersion');

// Test Data Version Creation
describe('Data Version Creation', () => {
  it('should create a new data version', async () => {
    const versionData = {
      tableName: 'products',
      data: [
        { name: 'Product A', price: 100 },
        { name: 'Product B', price: 200 },
        { name: 'Product C', price: 150 },
      ],
    };

    const createdVersion = await DataVersionService.createDataVersion(versionData);
    assert.strictEqual(createdVersion.tableName, versionData.tableName);
    assert.deepStrictEqual(createdVersion.data, versionData.data);

    const dataVersion = await DataVersion.findOne({ tableName: versionData.tableName });
    assert(dataVersion);
    assert.deepStrictEqual(dataVersion.data, versionData.data);
  });

  it('should not create a data version with missing fields', async () => {
    const invalidVersionData = {
      tableName: 'products',
    };

    const response = await DataVersionService.createDataVersion(invalidVersionData);
    assert.strictEqual(response, null);
  });
});

// Test Get Data Versions By Table Name
describe('Get Data Versions By Table Name', () => {
  it('should retrieve data versions for a table', async () => {
    const tableName = 'products';
    const versionData1 = {
      tableName,
      data: [
        { name: 'Product A', price: 100 },
        { name: 'Product B', price: 200 },
      ],
    };
    const versionData2 = {
      tableName,
      data: [
        { name: 'Product A', price: 90 },
        { name: 'Product B', price: 180 },
      ],
    };

    await DataVersion.create(versionData1);
    await DataVersion.create(versionData2);

    const dataVersions = await DataVersionService.getDataVersionsByTableName(tableName);
    assert.strictEqual(dataVersions.length, 2);
    assert.deepStrictEqual(dataVersions[0].data, versionData1.data);
    assert.deepStrictEqual(dataVersions[1].data, versionData2.data);
  });

  it('should return an empty array for a table with no data versions', async () => {
    const tableName = 'products';

    const dataVersions = await DataVersionService.getDataVersionsByTableName(tableName);
    assert.deepStrictEqual(dataVersions, []);
  });
});
