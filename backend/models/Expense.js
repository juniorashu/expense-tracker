const mongoose = require('mongoose');

// Define the schema for the Expense model
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

// Create the Expense model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense; // Export the model
