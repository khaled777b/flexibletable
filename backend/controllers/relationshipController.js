const Relationship = require('../models/relationship');

// Controller function to create a new relationship between two tables
exports.createRelationship = async (fromTable, toTable, relationshipType) => {
  try {
    // Check if the relationship already exists
    const existingRelationship = await Relationship.findOne({ fromTable, toTable });
    if (existingRelationship) {
      throw new Error('Relationship already exists between these tables.');
    }

    // Create a new relationship
    const newRelationship = new Relationship({ fromTable, toTable, relationshipType });
    await newRelationship.save();
    return newRelationship;
  } catch (err) {
    console.error('Error creating relationship:', err);
    throw new Error('An error occurred while creating the relationship.');
  }
};

// Controller function to delete an existing relationship
exports.deleteRelationship = async (relationshipId) => {
  try {
    // Check if the relationship ID is valid and the relationship exists
    const existingRelationship = await Relationship.findById(relationshipId);
    if (!existingRelationship) {
      throw new Error('Relationship not found.');
    }

    // Delete the relationship
    await existingRelationship.remove();
  } catch (err) {
    console.error('Error deleting relationship:', err);
    throw new Error('An error occurred while deleting the relationship.');
  }
};

// Controller function to fetch all relationships
exports.getAllRelationships = async () => {
  try {
    // Fetch all relationships
    const relationships = await Relationship.find();
    return relationships;
  } catch (err) {
    console.error('Error fetching relationships:', err);
    throw new Error('An error occurred while fetching the relationships.');
  }
};

// Controller function to fetch a specific relationship by ID
exports.getRelationshipById = async (relationshipId) => {
  try {
    // Check if the relationship ID is valid and the relationship exists
    const existingRelationship = await Relationship.findById(relationshipId);
    if (!existingRelationship) {
      throw new Error('Relationship not found.');
    }
    return existingRelationship;
  } catch (err) {
    console.error('Error fetching relationship:', err);
    throw new Error('An error occurred while fetching the relationship.');
  }
};
