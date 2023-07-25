const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/activityLog');
const { authenticate } = require('../middlewares/authentication');

// Log user activity
router.post('/', authenticate, async (req, res) => {
  try {
    const { userId, action, tableId, timestamp } = req.body;

    // Create a new activity log entry
    const newActivityLog = new ActivityLog({ userId, action, tableId, timestamp });
    await newActivityLog.save();

    res.status(201).json({ message: 'Activity log created successfully.', log: newActivityLog });
  } catch (err) {
    console.error('Error creating activity log:', err);
    res.status(500).json({ error: 'An error occurred while creating the activity log.' });
  }
});

// Get all activity logs for a specific user
router.get('/user/:userId',authenticate,  async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all activity logs for the specified user
    const activityLogs = await ActivityLog.find({ userId });

    res.status(200).json(activityLogs);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ error: 'An error occurred while fetching the activity logs.' });
  }
});

// Get all activity logs for a specific table
router.get('/table/:tableId',authenticate,  async (req, res) => {
  try {
    const tableId = req.params.tableId;

    // Fetch all activity logs for the specified table
    const activityLogs = await ActivityLog.find({ tableId });

    res.status(200).json(activityLogs);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ error: 'An error occurred while fetching the activity logs.' });
  }
});

// Get all activity logs
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch all activity logs
    const activityLogs = await ActivityLog.find();

    res.status(200).json(activityLogs);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ error: 'An error occurred while fetching the activity logs.' });
  }
});

module.exports = router;
