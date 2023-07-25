// backend/services/activityLogService.js

const ActivityLog = require('../models/ActivityLog');

const activityLogService = {
  // Log user activity
  logActivity: async (activityData) => {
    try {
      const newActivityLog = new ActivityLog(activityData);
      await newActivityLog.save();
      return newActivityLog;
    } catch (error) {
      throw new Error('Failed to log activity');
    }
  },

  // Get user activity logs
  getUserActivityLogs: async (userId) => {
    try {
      const activityLogs = await ActivityLog.find({ userId });
      return activityLogs;
    } catch (error) {
      throw new Error('Failed to get user activity logs');
    }
  },
};

module.exports = activityLogService;
