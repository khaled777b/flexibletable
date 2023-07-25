const Table = require('../models/table');

// Controller function to create a new table
exports.createTable = async (tableName, owner, columns) => {
  try {
    // Check if the table with the same name already exists
    const existingTable = await Table.findOne({ tableName });
    if (existingTable) {
      throw new Error('Table with this name already exists.');
    }

    // Create a new table
    const newTable = new Table({ tableName, owner, columns });
    await newTable.save();
    return newTable;
  } catch (err) {
    console.error('Error creating table:', err);
    throw new Error('An error occurred while creating the table.');
  }
};

// Controller function to update an existing table
exports.updateTable = async (tableId, tableName, columns) => {
  try {
    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      throw new Error('Table not found.');
    }

    // Update the table
    existingTable.tableName = tableName;
    existingTable.columns = columns;
    await existingTable.save();
    return existingTable;
  } catch (err) {
    console.error('Error updating table:', err);
    throw new Error('An error occurred while updating the table.');
  }
};

// Controller function to delete an existing table
exports.deleteTable = async (tableId) => {
  try {
    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      throw new Error('Table not found.');
    }

    // Delete the table
    await existingTable.remove();
  } catch (err) {
    console.error('Error deleting table:', err);
    throw new Error('An error occurred while deleting the table.');
  }
};

// Controller function to fetch all tables
exports.getAllTables = async () => {
  try {
    // Fetch all tables
    const tables = await Table.find();
    return tables;
  } catch (err) {
    console.error('Error fetching tables:', err);
    throw new Error('An error occurred while fetching the tables.');
  }
};

// Controller function to fetch a specific table by ID
exports.getTableById = async (tableId) => {
  try {
    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      throw new Error('Table not found.');
    }
    return existingTable;
  } catch (err) {
    console.error('Error fetching table:', err);
    throw new Error('An error occurred while fetching the table.');
  }
};
