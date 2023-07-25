const mongoose = require('mongoose');

const relationshipHistorySchema = new mongoose.Schema({
  fromTable: {
    type: String,
    required: true,
  },
  toTable: {
    type: String,
    required: true,
  },
  relationshipType: {
    type: String,
    enum: ['one-to-one', 'one-to-many', 'many-to-many'],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a compound index to ensure uniqueness of relationship history entries for each relationship
relationshipHistorySchema.index({ fromTable: 1, toTable: 1, relationshipType: 1 }, { unique: true });

const RelationshipHistory = mongoose.model('RelationshipHistory', relationshipHistorySchema);

module.exports = RelationshipHistory;
