const assert = require('assert');
const TableService = require('../services/tableService');
const TableMetadata = require('../models/tableMetadata');

// Test Table Creation
describe('Table Creation', () => {
  it('should create a new table', async () => {
    const tableData = {
      tableName: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'category', type: 'string' },
      ],
    };

    const createdTable = await TableService.createTable(tableData);
    assert.strictEqual(createdTable.tableName, tableData.tableName);
    assert.deepStrictEqual(createdTable.columns, tableData.columns);

    const table = await TableMetadata.findOne({ tableName: tableData.tableName });
    assert(table);
    assert.deepStrictEqual(table.columns, tableData.columns);
  });

  it('should not create a table with missing fields', async () => {
    const invalidTableData = {
      tableName: 'products',
    };

    const response = await TableService.createTable(invalidTableData);
    assert.strictEqual(response, null);
  });
});

// Test Table Update
describe('Table Update', () => {
  it('should update a table with new data', async () => {
    const tableData = {
      tableName: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
      ],
    };
    const table = await TableMetadata.create(tableData);

    const updatedTableData = {
      tableName: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'category', type: 'string' },
      ],
    };

    const updatedTable = await TableService.updateTable(table._id, updatedTableData);
    assert.strictEqual(updatedTable.tableName, updatedTableData.tableName);
    assert.deepStrictEqual(updatedTable.columns, updatedTableData.columns);

    const updatedTableInDB = await TableMetadata.findById(table._id);
    assert.deepStrictEqual(updatedTableInDB.columns, updatedTableData.columns);
  });

  it('should return null for updating a non-existent table', async () => {
    const nonExistentTableId = 'non-existent-table-id';
    const updatedTableData = {
      tableName: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
      ],
    };

    const updatedTable = await TableService.updateTable(nonExistentTableId, updatedTableData);
    assert.strictEqual(updatedTable, null);
  });
});

// Test Table Deletion
describe('Table Deletion', () => {
  it('should delete a table', async () => {
    const tableData = {
      tableName: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
      ],
    };
    const table = await TableMetadata.create(tableData);

    await TableService.deleteTable(table._id);

    const deletedTable = await TableMetadata.findById(table._id);
    assert.strictEqual(deletedTable, null);
  });

  it('should return null for deleting a non-existent table', async () => {
    const nonExistentTableId = 'non-existent-table-id';

    const deletedTable = await TableService.deleteTable(nonExistentTableId);
    assert.strictEqual(deletedTable, null);
  });
});
