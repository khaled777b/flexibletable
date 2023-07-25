const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
  },
  // Other fields representing the columns of the table
  // Example: column1: { type: String, required: true },
  //          column2: { type: Number, required: true },
  //          ...
  //          columnN: { type: String, required: true },
  // Dynamically created columns
  // For instance, if the TableMetadata specifies column1 as a String, column2 as a Number, etc.
  // The fields in this model will be automatically created based on the actual data provided by users.
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
