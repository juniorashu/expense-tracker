// Use the expense routes
// Mount the expenseRouter to the '/api/expenses' path
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { title, amount, date, category } = req.body;
  
  try {
    const Expenses = await Expense.create({ title, amount, date, category});
    res.status(201).json(Expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedExpenses = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpenses) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.status(200).json({ message: 'Salary deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // Export the routers
