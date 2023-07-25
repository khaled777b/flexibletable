// backend/services/relationshipService.js

const RelationshipHistory = require('../models/RelationshipHistory');

const relationshipService = {
  // Create a new relationship between two tables
  createRelationship: async (relationshipData) => {
    try {
      const newRelationship = new RelationshipHistory(relationshipData);
      await newRelationship.save();
      return newRelationship;
    } catch (error) {
      throw new Error('Failed to create relationship');
    }
  },

  // Get relationship history between two tables
  getRelationshipHistory: async (tableA, tableB) => {
    try {
      const relationshipHistory = await RelationshipHistory.find({
        $or: [
          { tableA, tableB },
          { tableA: tableB, tableB: tableA },
        ],
      });

      return relationshipHistory;
    } catch (error) {
      throw new Error('Failed to get relationship history');
    }
  },

  // Delete a relationship between two tables
  deleteRelationship: async (tableA, tableB) => {
    try {
      await RelationshipHistory.deleteOne({
        $or: [
          { tableA, tableB },
          { tableA: tableB, tableB: tableA },
        ],
      });
    } catch (error) {
      throw new Error('Failed to delete relationship');
    }
  },
};

module.exports = relationshipService;
