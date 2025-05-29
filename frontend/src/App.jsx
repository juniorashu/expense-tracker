// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './sidebar/Layout';
import AddSalaryForm from './component/Income/addSalaryForm';
import Income from './component/Income/income';
import Expenses from './component/expense/expense';
import Dashboard from './component/Dashboard/DashBoard';



function Transactions() {
  return <h1>Transactions Page</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
