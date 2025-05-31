import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data - replace with your actual API calls
        const mockIncomes = [
          { id: 1, amount: 1200, date: '2023-01-01', title: 'Salary' },
          { id: 2, amount: 1500, date: '2023-01-15', title: 'Bonus' },
          { id: 3, amount: 800, date: '2023-02-01', title: 'Freelance' }
        ];
        const mockExpenses = [
          { id: 1, amount: 200, date: '2023-01-05', title: 'Rent' },
          { id: 2, amount: 150, date: '2023-01-10', title: 'Groceries' },
          { id: 3, amount: 75, date: '2023-01-12', title: 'Utilities' },
          { id: 4, amount: 300, date: '2023-01-20', title: 'Dining' }
        ];

        setIncomes(mockIncomes);
        setExpenses(mockExpenses);
        
        // Uncomment for real API calls
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get('http://localhost:5000/api/salaries'),
          axios.get('http://localhost:5000/api/expenses')
        ]);
        setIncomes(incomeRes.data);
        setExpenses(expenseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate totals and ranges
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBalance = totalIncome - totalExpense;
  
  const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(i => i.amount)) : 0;
  const minIncome = incomes.length > 0 ? Math.min(...incomes.map(i => i.amount)) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map(e => e.amount)) : 0;

  // Recent history (last 3 transactions)
  const recentHistory = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Prepare histogram data
  const prepareHistogramData = () => {
    const incomeGroups = { '0-500': 0, '501-1000': 0, '1001-1500': 0, '1501+': 0 };
    const expenseGroups = { '0-100': 0, '101-300': 0, '301-500': 0, '501+': 0 };

    incomes.forEach(income => {
      const amount = income.amount;
      if (amount <= 500) incomeGroups['0-500']++;
      else if (amount <= 1000) incomeGroups['501-1000']++;
      else if (amount <= 1500) incomeGroups['1001-1500']++;
      else incomeGroups['1501+']++;
    });

    expenses.forEach(expense => {
      const amount = expense.amount;
      if (amount <= 100) expenseGroups['0-100']++;
      else if (amount <= 300) expenseGroups['101-300']++;
      else if (amount <= 500) expenseGroups['301-500']++;
      else expenseGroups['501+']++;
    });

    return [
      { name: '0-500', Income: incomeGroups['0-500'], Expense: expenseGroups['0-100'] },
      { name: '501-1000', Income: incomeGroups['501-1000'], Expense: expenseGroups['101-300'] },
      { name: '1001-1500', Income: incomeGroups['1001-1500'], Expense: expenseGroups['301-500'] },
      { name: '1500+', Income: incomeGroups['1501+'], Expense: expenseGroups['501+'] },
    ];
  };

  const histogramData = prepareHistogramData();

  // Chart data
  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense }
  ];

  const lineData = [
    ...incomes.map(i => ({ date: i.date, income: i.amount, expense: 0 })),
    ...expenses.map(e => ({ date: e.date, income: 0, expense: e.amount }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const COLORS = ['#00C49F', '#FF4C4C'];

  if (loading) return <div className="loading">Loading data...</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Expense Tracker Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p>${totalExpense.toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p className={totalBalance >= 0 ? 'positive' : 'negative'}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Range Cards */}
      <div className="range-cards">
        <div className="range-card">
          <h3>Income Range</h3>
          <div className="range-values">
            <span>Min: ${minIncome.toFixed(2)}</span>
            <span>Max: ${maxIncome.toFixed(2)}</span>
          </div>
        </div>
        <div className="range-card">
          <h3>Expense Range</h3>
          <div className="range-values">
            <span>Min: ${minExpense.toFixed(2)}</span>
            <span>Max: ${maxExpense.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Line Chart */}
        <div className="chart-wrapper">
          <h2>Income vs Expenses Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
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

        {/* Pie Chart */}
        <div className="chart-wrapper">
          <h2>Income/Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className="chart-wrapper">
          <h2>Transaction Frequency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#00C49F" />
              <Bar dataKey="Expense" fill="#FF4C4C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent History */}
      <div className="recent-history">
        <h2>Recent Transactions</h2>
        <div className="history-items">
          {recentHistory.map((item, index) => (
            <div key={index} className={`history-item ${item.type === 'income' ? 'income' : 'expense'}`}>
              <div className="history-title">{item.title}</div>
              <div className="history-amount">
                {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
              </div>
              <div className="history-date">{new Date(item.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;