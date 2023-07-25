const { validationResult } = require('express-validator');
const { DataVersion } = require('../models');
const dataVersionValidators = require('../validators/dataVersionValidators');

exports.createDataVersion = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const newData = req.body;

    // Validate the data before creating the version
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create the data version
    const dataVersion = new DataVersion({
      table: tableId,
      data: newData,
      createdBy: req.user._id, // Assuming you have user authentication middleware
    });

    await dataVersion.save();
    res.status(201).json(dataVersion);
  } catch (error) {
    console.error('Error creating data version:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDataVersion = async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const versionId = req.params.versionId;
    const newData = req.body;

    // Validate the data before updating the version
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the data version
    const dataVersion = await DataVersion.findById(versionId);

    if (!dataVersion) {
      return res.status(404).json({ error: 'Data version not found' });
    }

    // Check if the user has access to the data version (optional, based on your authorization logic)
    if (!canAccessDataVersion(req.user, dataVersion)) {
      return res.status(403).json({ error: 'Access to this data version is forbidden.' });
    }

    // Update the data version
    dataVersion.data = newData;
    await dataVersion.save();

    res.json(dataVersion);
  } catch (error) {
    console.error('Error updating data version:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDataVersion = async (req, res) => {
  try {
    const versionId = req.params.versionId;

    // Find the data version
    const dataVersion = await DataVersion.findById(versionId);

    if (!dataVersion) {
      return res.status(404).json({ error: 'Data version not found' });
    }

    // Check if the user has access to delete the data version (optional, based on your authorization logic)
    if (!canAccessDataVersion(req.user, dataVersion)) {
      return res.status(403).json({ error: 'Access to delete this data version is forbidden.' });
    }

    // Delete the data version
    await dataVersion.remove();

    res.json({ message: 'Data version deleted successfully' });
  } catch (error) {
    console.error('Error deleting data version:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
