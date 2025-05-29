import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import salaryRoutes from './routes/salaryRoutes.js';
import cors from 'cors';
import expenseRouter from './routes/expenseRouter.js'

const app = express();
app.use(cors());


dotenv.config();
connectDB();



app.use(express.json()); // To accept JSON data

app.use('/api/salaries', salaryRoutes);

// Use the expense routes
app.use('/api/expenses', expenseRouter); // Mount the expenseRouter to the '/api/expenses' path


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ports ${PORT}`));
