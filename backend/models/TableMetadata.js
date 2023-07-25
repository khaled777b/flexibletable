// backend/models/TableMetadata.js

const mongoose = require('mongoose');

const tableMetadataSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
    unique: true,
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
  columns: [
    {
      columnName: {
        type: String,
        required: true,
      },
      dataType: {
        type: String,
        required: true,
      },
      allowNull: {
        type: Boolean,
        default: true,
      },
    },
  ],
  relationships: [
    {
      tableName: {
        type: String,
        required: true,
      },
      relationshipType: {
        type: String,
        enum: ['one-to-one', 'one-to-many', 'many-to-many'],
        required: true,
      },
    },
  ],
});

const TableMetadata = mongoose.model('TableMetadata', tableMetadataSchema);

module.exports = TableMetadata;
