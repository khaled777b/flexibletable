// backend/models/CustomView.js

const mongoose = require('mongoose');

const customViewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  viewName: {
    type: String,
    required: true,
  },
  tableName: {
    type: String,
    required: true,
  },
  columns: {
    type: [String],
    required: true,
  },
  filters: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomView = mongoose.model('CustomView', customViewSchema);

module.exports = CustomView;
