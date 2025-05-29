import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Income.css'; // CSS file for styles
import SalaryList from './SalaryList';
import AddSalaryForm from './addSalaryForm';

function Income() {
  const [salaries, setSalaries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchSalaries = () => {
    axios.get('http://localhost:5000/api/salaries')
      .then((res) => {
        setSalaries(res.data);
        const total = res.data.reduce((sum, entry) => sum + Number(entry.amount), 0);
        setTotalIncome(total);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchSalaries();
  }, []);
  // delete items from the list
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/salaries/${id}`)
      .then(() => {
        fetchSalaries(); // Refresh the list after deletion
      })
      .catch((err) => console.error(err));
  };
  

  return (
    <div className="income-container">     
        <AddSalaryForm onSalaryAdded={fetchSalaries} />
      <div className="income-display">
        <h2>Total Income: <span className="green">${totalIncome}</span></h2>

        <div className="income-list">
          {salaries.map((item, index) => (
            <div key={index} className="income-card">
              <div className="icon">&#128176;</div> 
              <div className="details">
                <h4>{item.title}</h4>
                <p><strong>${item.amount}</strong></p>
                <p>📅 {item.date}</p>
                <p>💬 {item.description}</p>
              </div>
              <button className="delete-button" onClick={() => handleDelete(item._id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Income;
