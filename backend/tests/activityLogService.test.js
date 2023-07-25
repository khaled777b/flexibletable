const assert = require('assert');
const ActivityLogService = require('../services/activityLogService');
const ActivityLog = require('../models/activityLog');

// Test Activity Log Creation
describe('Activity Log Creation', () => {
  it('should create a new activity log', async () => {
    const activityData = {
      userId: 'user-id-123',
      action: 'Table Created',
      tableId: 'table-id-456',
    };

    const createdActivityLog = await ActivityLogService.createActivityLog(activityData);
    assert.strictEqual(createdActivityLog.userId, activityData.userId);
    assert.strictEqual(createdActivityLog.action, activityData.action);
    assert.strictEqual(createdActivityLog.tableId, activityData.tableId);

    const activityLog = await ActivityLog.findOne({ userId: activityData.userId });
    assert(activityLog);
    assert.strictEqual(activityLog.action, activityData.action);
    assert.strictEqual(activityLog.tableId, activityData.tableId);
  });

  it('should not create an activity log with missing fields', async () => {
    const invalidActivityData = {
      action: 'Table Created',
    };

    const response = await ActivityLogService.createActivityLog(invalidActivityData);
    assert.strictEqual(response, null);
  });
});

// Test Get Activity Logs By User ID
describe('Get Activity Logs By User ID', () => {
  it('should retrieve activity logs for a user', async () => {
    const userId = 'user-id-123';
    const activityData1 = {
      userId,
      action: 'Table Created',
      tableId: 'table-id-456',
    };
    const activityData2 = {
      userId,
      action: 'Table Updated',
      tableId: 'table-id-789',
    };

    await ActivityLog.create(activityData1);
    await ActivityLog.create(activityData2);

    const activityLogs = await ActivityLogService.getActivityLogsByUserId(userId);
    assert.strictEqual(activityLogs.length, 2);
    assert.strictEqual(activityLogs[0].action, activityData1.action);
    assert.strictEqual(activityLogs[1].action, activityData2.action);
  });

  it('should return an empty array for a user with no activity logs', async () => {
    const userId = 'user-id-123';

    const activityLogs = await ActivityLogService.getActivityLogsByUserId(userId);
    assert.deepStrictEqual(activityLogs, []);
  });
});
