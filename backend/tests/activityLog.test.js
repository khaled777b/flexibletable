const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const ActivityLog = require('../models/activityLog');

// Test Activity Log Creation
describe('Activity Log Creation', () => {
  it('should create a new activity log', async () => {
    const logData = {
      userId: 'user123',
      action: 'Table Creation',
      details: 'New table "products" created.',
    };

    const response = await request(app).post('/api/activity-logs').send(logData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.userId, logData.userId);
    assert.strictEqual(response.body.action, logData.action);
    assert.strictEqual(response.body.details, logData.details);

    const activityLog = await ActivityLog.findOne({ userId: logData.userId });
    assert(activityLog);
    assert.strictEqual(activityLog.action, logData.action);
    assert.strictEqual(activityLog.details, logData.details);
  });

  it('should not create an activity log with missing fields', async () => {
    const invalidLogData = {
      userId: 'user123',
    };

    const response = await request(app).post('/api/activity-logs').send(invalidLogData);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Missing required fields.');
  });
});

// Test Activity Log Retrieval
describe('Activity Log Retrieval', () => {
  it('should retrieve all activity logs', async () => {
    const logData1 = {
      userId: 'user123',
      action: 'Table Creation',
      details: 'New table "products" created.',
    };
    const logData2 = {
      userId: 'user456',
      action: 'Table Update',
      details: 'Table "orders" updated.',
    };
    await ActivityLog.create(logData1);
    await ActivityLog.create(logData2);

    const response = await request(app).get('/api/activity-logs');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 2);

    const log1 = response.body[0];
    const log2 = response.body[1];
    assert.strictEqual(log1.userId, logData1.userId);
    assert.strictEqual(log1.action, logData1.action);
    assert.strictEqual(log1.details, logData1.details);
    assert.strictEqual(log2.userId, logData2.userId);
    assert.strictEqual(log2.action, logData2.action);
    assert.strictEqual(log2.details, logData2.details);
  });
});
