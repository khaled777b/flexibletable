// backend/services/tableService.js

const TableMetadata = require('../models/TableMetadata');

const tableService = {
  // Create a new table
  createTable: async (tableData) => {
    try {
      const newTable = new TableMetadata(tableData);
      await newTable.save();
      return newTable;
    } catch (error) {
      throw new Error('Failed to create table');
    }
  },

  // Find a table by name
  getTableByName: async (tableName) => {
    try {
      const table = await TableMetadata.findOne({ name: tableName });
      if (!table) {
        throw new Error('Table not found');
      }
      return table;
    } catch (error) {
      throw new Error('Failed to get table by name');
    }
  },

  // Update table metadata
  updateTableMetadata: async (tableName, updates) => {
    try {
      const table = await tableService.getTableByName(tableName);
      Object.assign(table, updates);
      await table.save();
      return table;
    } catch (error) {
      throw new Error('Failed to update table metadata');
    }
  },
};

module.exports = tableService;
