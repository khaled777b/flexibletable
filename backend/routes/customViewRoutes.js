const express = require('express');
const router = express.Router();
const CustomView = require('../models/customView');
const { authenticate } = require('../middlewares/authentication');

// Create a new custom view for a table
router.post('/', authenticate, async (req, res) => {
  try {
    const { tableName, viewName, columns, filters } = req.body;

    // Check if the custom view already exists for the table and view name
    const existingView = await CustomView.findOne({ tableName, viewName });
    if (existingView) {
      return res.status(409).json({ error: 'Custom view with this name already exists for the table.' });
    }

    // Create a new custom view
    const newView = new CustomView({ tableName, viewName, columns, filters });
    await newView.save();

    res.status(201).json({ message: 'Custom view created successfully.', view: newView });
  } catch (err) {
    console.error('Error creating custom view:', err);
    res.status(500).json({ error: 'An error occurred while creating the custom view.' });
  }
});

// Update an existing custom view
router.put('/:id', authenticate, async (req, res) => {
  try {
    const viewId = req.params.id;
    const { viewName, columns, filters } = req.body;

    // Check if the custom view ID is valid and the view exists
    const existingView = await CustomView.findById(viewId);
    if (!existingView) {
      return res.status(404).json({ error: 'Custom view not found.' });
    }

    // Update the custom view
    existingView.viewName = viewName;
    existingView.columns = columns;
    existingView.filters = filters;
    await existingView.save();

    res.status(200).json({ message: 'Custom view updated successfully.', view: existingView });
  } catch (err) {
    console.error('Error updating custom view:', err);
    res.status(500).json({ error: 'An error occurred while updating the custom view.' });
  }
});

// Delete an existing custom view
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const viewId = req.params.id;

    // Check if the custom view ID is valid and the view exists
    const existingView = await CustomView.findById(viewId);
    if (!existingView) {
      return res.status(404).json({ error: 'Custom view not found.' });
    }

    // Delete the custom view
    await existingView.remove();

    res.status(200).json({ message: 'Custom view deleted successfully.' });
  } catch (err) {
    console.error('Error deleting custom view:', err);
    res.status(500).json({ error: 'An error occurred while deleting the custom view.' });
  }
});

// Get all custom views for a specific table
router.get('/:tableName', authenticate, async (req, res) => {
  try {
    const tableName = req.params.tableName;

    // Fetch all custom views for the specified table
    const customViews = await CustomView.find({ tableName });

    res.status(200).json(customViews);
  } catch (err) {
    console.error('Error fetching custom views:', err);
    res.status(500).json({ error: 'An error occurred while fetching the custom views.' });
  }
});

module.exports = router;
