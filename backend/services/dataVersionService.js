// backend/services/dataVersionService.js

const DataVersion = require('../models/DataVersion');

const dataVersionService = {
  // Create a new data version for a table
  createDataVersion: async (tableId, data) => {
    try {
      const newDataVersion = new DataVersion({ tableId, data });
      await newDataVersion.save();
      return newDataVersion;
    } catch (error) {
      throw new Error('Failed to create data version');
    }
  },

  // Get all data versions for a table
  getDataVersionsByTableId: async (tableId) => {
    try {
      const dataVersions = await DataVersion.find({ tableId });
      return dataVersions;
    } catch (error) {
      throw new Error('Failed to get data versions for table');
    }
  },

  // Get specific data version by ID
  getDataVersionById: async (dataVersionId) => {
    try {
      const dataVersion = await DataVersion.findById(dataVersionId);
      if (!dataVersion) {
        throw new Error('Data version not found');
      }
      return dataVersion;
    } catch (error) {
      throw new Error('Failed to get data version by ID');
    }
  },
};

module.exports = dataVersionService;
