import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const incomeRes = await axios.get('http://localhost:5000/api/salaries');
    const expenseRes = await axios.get('http://localhost:5000/api/expenses');

    const incomesWithType = incomeRes.data.map(item => ({ ...item, type: 'income' }));
    const expensesWithType = expenseRes.data.map(item => ({ ...item, type: 'expense' }));

    setIncomes(incomesWithType);
    setExpenses(expensesWithType);
  };
  fetchData();
}, []);


  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const recentHistory = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const minIncome = Math.min(...incomes.map(i => i.amount));
  const maxIncome = Math.max(...incomes.map(i => i.amount));
  const minExpense = Math.min(...expenses.map(e => e.amount));
  const maxExpense = Math.max(...expenses.map(e => e.amount));

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense }
  ];
  const COLORS = ['#00C49F', '#FF4C4C'];

  const chartData = [
    ...incomes.map(i => ({ date: i.date, income: i.amount, expense: 0 })),
    ...expenses.map(e => ({ date: e.date, income: 0, expense: e.amount }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">All Transactions</h1>

      <div className="dashboard-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#00C49F" />
            <Line type="monotone" dataKey="expense" stroke="#FF4C4C" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Income</h2>
          <p className="income">${totalIncome}</p>
        </div>
        <div className="summary-card">
          <h2>Total Expenses</h2>
          <p className="expense">${totalExpense}</p>
        </div>
        <div className="summary-card">
          <h2>Total Balance</h2>
          <p className="balance">${totalBalance}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-history">
          <h2>Recent History</h2>
          {recentHistory.map((item, index) => (
            <div
              key={index}
              className={`history-item ${item.type === 'income' ? 'income-bg' : 'expense-bg'}`}
            >
              {item.title} <span className="float-right">{item.type === 'income' ? '+' : '-'}${item.amount}</span>
            </div>
          ))}
        </div>

        <div className="summary-range">
          <h2>Salary</h2>
          <div className="range">
            <span>${minIncome}</span>
            <span>${maxIncome}</span>
          </div>
        </div>

        <div className="summary-range">
          <h2>Expense</h2>
          <div className="range">
            <span>${minExpense}</span>
            <span>${maxExpense}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-pie">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
