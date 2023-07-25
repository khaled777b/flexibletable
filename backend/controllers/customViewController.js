const CustomView = require('../models/customView');

// Controller function to create a new custom view for a table
exports.createCustomView = async (tableName, viewName, columns, filters) => {
  try {
    // Check if the custom view already exists for the table and view name
    const existingView = await CustomView.findOne({ tableName, viewName });
    if (existingView) {
      throw new Error('Custom view with this name already exists for the table.');
    }

    // Create a new custom view
    const newView = new CustomView({ tableName, viewName, columns, filters });
    await newView.save();
    return newView;
  } catch (err) {
    console.error('Error creating custom view:', err);
    throw new Error('An error occurred while creating the custom view.');
  }
};

// Controller function to update an existing custom view
exports.updateCustomView = async (viewId, viewName, columns, filters) => {
  try {
    // Check if the custom view ID is valid and the view exists
    const existingView = await CustomView.findById(viewId);
    if (!existingView) {
      throw new Error('Custom view not found.');
    }

    // Update the custom view
    existingView.viewName = viewName;
    existingView.columns = columns;
    existingView.filters = filters;
    await existingView.save();
    return existingView;
  } catch (err) {
    console.error('Error updating custom view:', err);
    throw new Error('An error occurred while updating the custom view.');
  }
};

// Controller function to delete an existing custom view
exports.deleteCustomView = async (viewId) => {
  try {
    // Check if the custom view ID is valid and the view exists
    const existingView = await CustomView.findById(viewId);
    if (!existingView) {
      throw new Error('Custom view not found.');
    }

    // Delete the custom view
    await existingView.remove();
  } catch (err) {
    console.error('Error deleting custom view:', err);
    throw new Error('An error occurred while deleting the custom view.');
  }
};

// Controller function to fetch all custom views for a specific table
exports.getCustomViewsByTable = async (tableName) => {
  try {
    // Fetch all custom views for the specified table
    const customViews = await CustomView.find({ tableName });
    return customViews;
  } catch (err) {
    console.error('Error fetching custom views:', err);
    throw new Error('An error occurred while fetching the custom views.');
  }
};
