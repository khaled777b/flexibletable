// backend/services/customViewService.js

const CustomView = require('../models/CustomView');

const customViewService = {
  // Create a new custom view
  createCustomView: async (customViewData) => {
    try {
      const newCustomView = new CustomView(customViewData);
      await newCustomView.save();
      return newCustomView;
    } catch (error) {
      throw new Error('Failed to create custom view');
    }
  },

  // Get custom views by user ID
  getCustomViewsByUserId: async (userId) => {
    try {
      const customViews = await CustomView.find({ userId });
      return customViews;
    } catch (error) {
      throw new Error('Failed to get custom views by user ID');
    }
  },
};

module.exports = customViewService;
