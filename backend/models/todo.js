const mongoose = require('mongoose');

//schema
const todoSchema = new mongoose.Schema({
  taskName: { type: String, required: true }, // Task name must be a string and is required
  isChecked: { type: Boolean, default: false }, // Boolean field with default value of false
  uniqueId: { type: String, unique: true }, // Unique identifier for the todo item
  createdAt: { type: Date, default: Date.now } // Date field with a default value of the current date/time
});

// Create the model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
