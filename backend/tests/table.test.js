const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Table = require('../models/table');

// Test Table Creation
describe('Table Creation', () => {
  it('should create a new table', async () => {
    const tableData = {
      tableName: 'new_table',
      owner: 'user123',
      columns: [
        { columnName: 'column1', dataType: 'string' },
        { columnName: 'column2', dataType: 'number' },
        // Add more columns as needed
      ],
    };

    const response = await request(app).post('/api/tables').send(tableData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.tableName, tableData.tableName);
    assert.strictEqual(response.body.owner, tableData.owner);

    const table = await Table.findOne({ tableName: tableData.tableName });
    assert(table);
    assert.strictEqual(table.owner, tableData.owner);
  });

  it('should not create a table with an existing name', async () => {
    const existingTableData = {
      tableName: 'existing_table',
      owner: 'user456',
      columns: [
        { columnName: 'column1', dataType: 'string' },
      ],
    };
    await Table.create(existingTableData);

    const newTableDataWithExistingName = {
      tableName: 'existing_table',
      owner: 'user789',
      columns: [
        { columnName: 'column2', dataType: 'number' },
      ],
    };

    const response = await request(app).post('/api/tables').send(newTableDataWithExistingName);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Table with this name already exists.');
  });
});

// Test Table Update
describe('Table Update', () => {
  it('should update an existing table', async () => {
    const existingTableData = {
      tableName: 'existing_table',
      owner: 'user123',
      columns: [
        { columnName: 'column1', dataType: 'string' },
      ],
    };
    const table = await Table.create(existingTableData);

    const updatedTableData = {
      tableName: 'updated_table',
      owner: 'user123',
      columns: [
        { columnName: 'updated_column1', dataType: 'number' },
      ],
    };

    const response = await request(app).put(`/api/tables/${table._id}`).send(updatedTableData);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.tableName, updatedTableData.tableName);

    const updatedTable = await Table.findById(table._id);
    assert.strictEqual(updatedTable.tableName, updatedTableData.tableName);
    assert.strictEqual(updatedTable.owner, updatedTableData.owner);
    assert.strictEqual(updatedTable.columns.length, 1);
    assert.strictEqual(updatedTable.columns[0].columnName, updatedTableData.columns[0].columnName);
  });

  it('should return an error when trying to update a non-existent table', async () => {
    const nonExistentTableId = 'non-existent-table-id';
    const updatedTableData = {
      tableName: 'updated_table',
      owner: 'user123',
      columns: [
        { columnName: 'updated_column1', dataType: 'number' },
      ],
    };

    const response = await request(app).put(`/api/tables/${nonExistentTableId}`).send(updatedTableData);
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Table not found.');
  });
});

// Test Table Deletion
describe('Table Deletion', () => {
  it('should delete an existing table', async () => {
    const existingTableData = {
      tableName: 'existing_table',
      owner: 'user123',
      columns: [
        { columnName: 'column1', dataType: 'string' },
      ],
    };
    const table = await Table.create(existingTableData);

    const response = await request(app).delete(`/api/tables/${table._id}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Table deleted.');

    const deletedTable = await Table.findById(table._id);
    assert.strictEqual(deletedTable, null);
  });

  it('should return an error when trying to delete a non-existent table', async () => {
    const nonExistentTableId = 'non-existent-table-id';

    const response = await request(app).delete(`/api/tables/${nonExistentTableId}`);
    assert.strictEqual(response.status, 404);
