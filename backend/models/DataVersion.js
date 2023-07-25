// backend/models/DataVersion.js

const mongoose = require('mongoose');

const dataVersionSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DataVersion = mongoose.model('DataVersion', dataVersionSchema);

module.exports = DataVersion;
