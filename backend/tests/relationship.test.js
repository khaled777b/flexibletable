const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Relationship = require('../models/relationship');

// Test Relationship Creation
describe('Relationship Creation', () => {
  it('should create a new relationship', async () => {
    const relationshipData = {
      sourceTable: 'table1',
      sourceColumn: 'column1',
      targetTable: 'table2',
      targetColumn: 'column2',
    };

    const response = await request(app).post('/api/relationships').send(relationshipData);
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.sourceTable, relationshipData.sourceTable);
    assert.strictEqual(response.body.sourceColumn, relationshipData.sourceColumn);

    const relationship = await Relationship.findOne({
      sourceTable: relationshipData.sourceTable,
      sourceColumn: relationshipData.sourceColumn,
    });
    assert(relationship);
    assert.strictEqual(relationship.targetTable, relationshipData.targetTable);
    assert.strictEqual(relationship.targetColumn, relationshipData.targetColumn);
  });

  it('should not create a relationship with invalid table or column names', async () => {
    const invalidRelationshipData = {
      sourceTable: 'invalid_table',
      sourceColumn: 'invalid_column',
      targetTable: 'table2',
      targetColumn: 'column2',
    };

    const response = await request(app).post('/api/relationships').send(invalidRelationshipData);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Invalid source table or column.');
  });
});

// Test Relationship Deletion
describe('Relationship Deletion', () => {
  it('should delete an existing relationship', async () => {
    const existingRelationshipData = {
      sourceTable: 'table1',
      sourceColumn: 'column1',
      targetTable: 'table2',
      targetColumn: 'column2',
    };
    const relationship = await Relationship.create(existingRelationshipData);

    const response = await request(app).delete(`/api/relationships/${relationship._id}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Relationship deleted.');

    const deletedRelationship = await Relationship.findById(relationship._id);
    assert.strictEqual(deletedRelationship, null);
  });

  it('should return an error when trying to delete a non-existent relationship', async () => {
    const nonExistentRelationshipId = 'non-existent-relationship-id';

    const response = await request(app).delete(`/api/relationships/${nonExistentRelationshipId}`);
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.message, 'Relationship not found.');
  });
});
