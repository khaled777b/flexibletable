const express = require('express');
const router = express.Router();
const Table = require('../models/table');
const { authenticate } = require('../middlewares/authentication');

// Create a new table
router.post('/', authenticate, async (req, res) => {
  try {
    const { tableName, columns } = req.body;

    // Check if the table name already exists
    const existingTable = await Table.findOne({ tableName });
    if (existingTable) {
      return res.status(409).json({ error: 'Table with this name already exists.' });
    }

    // Create a new table
    const newTable = new Table({ tableName, columns });
    await newTable.save();

    res.status(201).json({ message: 'Table created successfully.', table: newTable });
  } catch (err) {
    console.error('Error creating table:', err);
    res.status(500).json({ error: 'An error occurred while creating the table.' });
  }
});

// Update an existing table
router.put('/:id', authenticate, async (req, res) => {
  try {
    const tableId = req.params.id;
    const { tableName, columns } = req.body;

    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    // Update the table
    existingTable.tableName = tableName;
    existingTable.columns = columns;
    await existingTable.save();

    res.status(200).json({ message: 'Table updated successfully.', table: existingTable });
  } catch (err) {
    console.error('Error updating table:', err);
    res.status(500).json({ error: 'An error occurred while updating the table.' });
  }
});

// Delete an existing table
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const tableId = req.params.id;

    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    // Delete the table
    await existingTable.remove();

    res.status(200).json({ message: 'Table deleted successfully.' });
  } catch (err) {
    console.error('Error deleting table:', err);
    res.status(500).json({ error: 'An error occurred while deleting the table.' });
  }
});

// Get all tables
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch all tables
    const tables = await Table.find();

    res.status(200).json(tables);
  } catch (err) {
    console.error('Error fetching tables:', err);
    res.status(500).json({ error: 'An error occurred while fetching the tables.' });
  }
});

// Get a specific table by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const tableId = req.params.id;

    // Check if the table ID is valid and the table exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      return res.status(404).json({ error: 'Table not found.' });
    }

    res.status(200).json(existingTable);
  } catch (err) {
    console.error('Error fetching table:', err);
    res.status(500).json({ error: 'An error occurred while fetching the table.' });
  }
});

module.exports = router;
