import express from 'express';
import Salary from '../models/Salary.js';

const router = express.Router();

// POST /api/salaries - Create new salary
router.post('/', async (req, res) => {
  const { title, amount, date, description } = req.body;
  
  try {
    const salary = await Salary.create({ title, amount, date, description });
    res.status(201).json(salary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  // GET /api/salaries - Get all salaries
router.get('/', async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ createdAt: -1 }); // newest first
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// PUT /api/salaries/:id - Update a salary
router.put('/:id', async (req, res) => {
  const { title, amount, date, description } = req.body;

  try {
    const salary = await Salary.findById(req.params.id);

    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    salary.title = title;
    salary.amount = amount;
    salary.date = date;
    salary.description = description;

    const updatedSalary = await salary.save();
    res.json(updatedSalary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
    if (!deletedSalary) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.status(200).json({ message: 'Salary deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
