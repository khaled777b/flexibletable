const express = require('express');
const router = express.Router();
const Relationship = require('../models/relationship');
const { authenticate } = require('../middlewares/authentication');

// Create a new relationship between two tables
router.post('/', authenticate, async (req, res) => {
  try {
    const { fromTable, toTable, relationshipType } = req.body;

    // Check if the relationship already exists
    const existingRelationship = await Relationship.findOne({ fromTable, toTable });
    if (existingRelationship) {
      return res.status(409).json({ error: 'Relationship already exists between these tables.' });
    }

    // Create a new relationship
    const newRelationship = new Relationship({ fromTable, toTable, relationshipType });
    await newRelationship.save();

    res.status(201).json({ message: 'Relationship created successfully.', relationship: newRelationship });
  } catch (err) {
    console.error('Error creating relationship:', err);
    res.status(500).json({ error: 'An error occurred while creating the relationship.' });
  }
});

// Delete an existing relationship
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const relationshipId = req.params.id;

    // Check if the relationship ID is valid and the relationship exists
    const existingRelationship = await Relationship.findById(relationshipId);
    if (!existingRelationship) {
      return res.status(404).json({ error: 'Relationship not found.' });
    }

    // Delete the relationship
    await existingRelationship.remove();

    res.status(200).json({ message: 'Relationship deleted successfully.' });
  } catch (err) {
    console.error('Error deleting relationship:', err);
    res.status(500).json({ error: 'An error occurred while deleting the relationship.' });
  }
});

// Get all relationships
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch all relationships
    const relationships = await Relationship.find();

    res.status(200).json(relationships);
  } catch (err) {
    console.error('Error fetching relationships:', err);
    res.status(500).json({ error: 'An error occurred while fetching the relationships.' });
  }
});

// Get a specific relationship by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const relationshipId = req.params.id;

    // Check if the relationship ID is valid and the relationship exists
    const existingRelationship = await Relationship.findById(relationshipId);
    if (!existingRelationship) {
      return res.status(404).json({ error: 'Relationship not found.' });
    }

    res.status(200).json(existingRelationship);
  } catch (err) {
    console.error('Error fetching relationship:', err);
    res.status(500).json({ error: 'An error occurred while fetching the relationship.' });
  }
});

module.exports = router;
