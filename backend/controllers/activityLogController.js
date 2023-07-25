const ActivityLog = require('../models/activityLog');

// Controller function to log user activity
exports.logActivity = async (userId, action, tableId, timestamp) => {
  try {
    // Create a new activity log entry
    const newActivityLog = new ActivityLog({ userId, action, tableId, timestamp });
    await newActivityLog.save();
  } catch (err) {
    console.error('Error creating activity log:', err);
    throw new Error('An error occurred while creating the activity log.');
  }
};

// Controller function to fetch all activity logs for a specific user
exports.getActivityLogsByUser = async (userId) => {
  try {
    // Fetch all activity logs for the specified user
    const activityLogs = await ActivityLog.find({ userId });
    return activityLogs;
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    throw new Error('An error occurred while fetching the activity logs.');
  }
};

// Controller function to fetch all activity logs for a specific table
exports.getActivityLogsByTable = async (tableId) => {
  try {
    // Fetch all activity logs for the specified table
    const activityLogs = await ActivityLog.find({ tableId });
    return activityLogs;
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    throw new Error('An error occurred while fetching the activity logs.');
  }
};

// Controller function to fetch all activity logs
exports.getAllActivityLogs = async () => {
  try {
    // Fetch all activity logs
    const activityLogs = await ActivityLog.find();
    return activityLogs;
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    throw new Error('An error occurred while fetching the activity logs.');
  }
};
