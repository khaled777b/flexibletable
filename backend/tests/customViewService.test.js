const assert = require('assert');
const CustomViewService = require('../services/customViewService');
const CustomView = require('../models/customView');

// Test Custom View Creation
describe('Custom View Creation', () => {
  it('should create a new custom view', async () => {
    const viewData = {
      name: 'My Custom View',
      userId: 'user-id-123',
      tableName: 'products',
      columns: ['name', 'price', 'category'],
    };

    const createdView = await CustomViewService.createCustomView(viewData);
    assert.strictEqual(createdView.name, viewData.name);
    assert.strictEqual(createdView.userId, viewData.userId);
    assert.strictEqual(createdView.tableName, viewData.tableName);
    assert.deepStrictEqual(createdView.columns, viewData.columns);

    const customView = await CustomView.findOne({ userId: viewData.userId });
    assert(customView);
    assert.strictEqual(customView.name, viewData.name);
    assert.strictEqual(customView.userId, viewData.userId);
    assert.strictEqual(customView.tableName, viewData.tableName);
    assert.deepStrictEqual(customView.columns, viewData.columns);
  });

  it('should not create a custom view with missing fields', async () => {
    const invalidViewData = {
      name: 'My Custom View',
      userId: 'user-id-123',
    };

    const response = await CustomViewService.createCustomView(invalidViewData);
    assert.strictEqual(response, null);
  });
});

// Test Get Custom Views By User ID
describe('Get Custom Views By User ID', () => {
  it('should retrieve custom views for a user', async () => {
    const userId = 'user-id-123';
    const viewData1 = {
      name: 'View 1',
      userId,
      tableName: 'products',
      columns: ['name', 'price'],
    };
    const viewData2 = {
      name: 'View 2',
      userId,
      tableName: 'orders',
      columns: ['customerName', 'orderDate'],
    };

    await CustomView.create(viewData1);
    await CustomView.create(viewData2);

    const customViews = await CustomViewService.getCustomViewsByUserId(userId);
    assert.strictEqual(customViews.length, 2);
    assert.strictEqual(customViews[0].name, viewData1.name);
    assert.strictEqual(customViews[1].name, viewData2.name);
  });

  it('should return an empty array for a user with no custom views', async () => {
    const userId = 'user-id-123';

    const customViews = await CustomViewService.getCustomViewsByUserId(userId);
    assert.deepStrictEqual(customViews, []);
  });
});
