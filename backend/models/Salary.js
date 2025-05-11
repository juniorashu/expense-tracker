import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
