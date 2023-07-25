const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  fromTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TableMetadata',
    required: true,
  },
  toTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TableMetadata',
    required: true,
  },
  relationshipType: {
    type: String,
    enum: ['one-to-one', 'one-to-many', 'many-to-many'],
    required: true,
  },
  // Add other relevant fields specific to the relationships, such as descriptions, labels, etc.
  // ...
}, { timestamps: true });

// Create the Relationship model
const Relationship = mongoose.model('Relationship', relationshipSchema);

module.exports = Relationship;
