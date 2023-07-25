const assert = require('assert');
const RelationshipService = require('../services/relationshipService');
const RelationshipHistory = require('../models/relationshipHistory');

// Test Relationship Creation
describe('Relationship Creation', () => {
  it('should create a new relationship', async () => {
    const relationshipData = {
      tableName: 'orders',
      relationshipType: 'one-to-many',
      relatedTable: 'products',
      foreignKey: 'productId',
    };

    const createdRelationship = await RelationshipService.createRelationship(relationshipData);
    assert.strictEqual(createdRelationship.tableName, relationshipData.tableName);
    assert.strictEqual(createdRelationship.relationshipType, relationshipData.relationshipType);
    assert.strictEqual(createdRelationship.relatedTable, relationshipData.relatedTable);
    assert.strictEqual(createdRelationship.foreignKey, relationshipData.foreignKey);

    const relationship = await RelationshipHistory.findOne({ tableName: relationshipData.tableName });
    assert(relationship);
    assert.strictEqual(relationship.relationshipType, relationshipData.relationshipType);
    assert.strictEqual(relationship.relatedTable, relationshipData.relatedTable);
    assert.strictEqual(relationship.foreignKey, relationshipData.foreignKey);
  });

  it('should not create a relationship with missing fields', async () => {
    const invalidRelationshipData = {
      tableName: 'orders',
      relationshipType: 'one-to-many',
    };

    const response = await RelationshipService.createRelationship(invalidRelationshipData);
    assert.strictEqual(response, null);
  });
});

// Test Relationship Update
describe('Relationship Update', () => {
  it('should update a relationship with new data', async () => {
    const relationshipData = {
      tableName: 'orders',
      relationshipType: 'one-to-many',
      relatedTable: 'products',
      foreignKey: 'productId',
    };
    const relationship = await RelationshipHistory.create(relationshipData);

    const updatedRelationshipData = {
      tableName: 'orders',
      relationshipType: 'many-to-many',
      relatedTable: 'customers',
      foreignKey: 'customerId',
    };

    const updatedRelationship = await RelationshipService.updateRelationship(relationship._id, updatedRelationshipData);
    assert.strictEqual(updatedRelationship.tableName, updatedRelationshipData.tableName);
    assert.strictEqual(updatedRelationship.relationshipType, updatedRelationshipData.relationshipType);
    assert.strictEqual(updatedRelationship.relatedTable, updatedRelationshipData.relatedTable);
    assert.strictEqual(updatedRelationship.foreignKey, updatedRelationshipData.foreignKey);

    const updatedRelationshipInDB = await RelationshipHistory.findById(relationship._id);
    assert.strictEqual(updatedRelationshipInDB.relationshipType, updatedRelationshipData.relationshipType);
    assert.strictEqual(updatedRelationshipInDB.relatedTable, updatedRelationshipData.relatedTable);
    assert.strictEqual(updatedRelationshipInDB.foreignKey, updatedRelationshipData.foreignKey);
  });

  it('should return null for updating a non-existent relationship', async () => {
    const nonExistentRelationshipId = 'non-existent-relationship-id';
    const updatedRelationshipData = {
      tableName: 'orders',
      relationshipType: 'many-to-many',
      relatedTable: 'customers',
      foreignKey: 'customerId',
    };

    const updatedRelationship = await RelationshipService.updateRelationship(nonExistentRelationshipId, updatedRelationshipData);
    assert.strictEqual(updatedRelationship, null);
  });
});

// Test Relationship Deletion
describe('Relationship Deletion', () => {
  it('should delete a relationship', async () => {
    const relationshipData = {
      tableName: 'orders',
      relationshipType: 'one-to-many',
      relatedTable: 'products',
      foreignKey: 'productId',
    };
    const relationship = await RelationshipHistory.create(relationshipData);

    await RelationshipService.deleteRelationship(relationship._id);

    const deletedRelationship = await RelationshipHistory.findById(relationship._id);
    assert.strictEqual(deletedRelationship, null);
  });

  it('should return null for deleting a non-existent relationship', async () => {
    const nonExistentRelationshipId = 'non-existent-relationship-id';

    const deletedRelationship = await RelationshipService.deleteRelationship(nonExistentRelationshipId);
    assert.strictEqual(deletedRelationship, null);
  });
});
