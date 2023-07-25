const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const CustomView = require('../models/customView');

// Test Custom View Creation
describe('Custom View Creation', () => {
  it('should create a new custom view', async () => {
    const viewData = {
      userId: 'user123',
      viewName: 'My Custom View',
      tableName: 'products',
      columns: ['name', 'price'],
      filters: {
        category: 'Electronics',
      },
    };

    const response = await request(app).post('/api/custom-views').send(viewData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.userId, viewData.userId);
    assert.strictEqual(response.body.viewName, viewData.viewName);
    assert.strictEqual(response.body.tableName, viewData.tableName);

    const customView = await CustomView.findOne({ userId: viewData.userId });
    assert(customView);
    assert.strictEqual(customView.viewName, viewData.viewName);
    assert.strictEqual(customView.tableName, viewData.tableName);
  });

  it('should not create a custom view with missing fields', async () => {
    const invalidViewData = {
      userId: 'user123',
    };

    const response = await request(app).post('/api/custom-views').send(invalidViewData);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Missing required fields.');
  });
});

// Test Custom View Retrieval
describe('Custom View Retrieval', () => {
  it('should retrieve all custom views for a user', async () => {
    const viewData1 = {
      userId: 'user123',
      viewName: 'View 1',
      tableName: 'products',
      columns: ['name', 'price'],
      filters: {
        category: 'Electronics',
      },
    };
    const viewData2 = {
      userId: 'user123',
      viewName: 'View 2',
      tableName: 'orders',
      columns: ['orderNumber', 'totalAmount'],
      filters: {
        status: 'Pending',
      },
    };
    await CustomView.create(viewData1);
    await CustomView.create(viewData2);

    const response = await request(app).get('/api/custom-views?userId=user123');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 2);

    const view1 = response.body[0];
    const view2 = response.body[1];
    assert.strictEqual(view1.userId, viewData1.userId);
    assert.strictEqual(view1.viewName, viewData1.viewName);
    assert.strictEqual(view1.tableName, viewData1.tableName);
    assert.deepStrictEqual(view1.columns, viewData1.columns);
    assert.deepStrictEqual(view1.filters, viewData1.filters);
    assert.strictEqual(view2.userId, viewData2.userId);
    assert.strictEqual(view2.viewName, viewData2.viewName);
    assert.strictEqual(view2.tableName, viewData2.tableName);
    assert.deepStrictEqual(view2.columns, viewData2.columns);
    assert.deepStrictEqual(view2.filters, viewData2.filters);
  });
});
