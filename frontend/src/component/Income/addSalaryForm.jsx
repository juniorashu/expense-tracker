import { useState } from 'react';
import axios from 'axios';
import './AddSalaryForm.css';

 // Adjust the import based on your file structure


function AddSalaryForm(props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    console.log(setError);
    
    const HandleSubmit = (e) => {
      e.preventDefault();
    
      const data = {
        title,
        amount,
        date,
        description,
      };
    
      axios.post('http://localhost:5000/api/salaries', data)
        .then(() => {
          props.onSalaryAdded() // Call parent function to refetch
          setTitle('');
          setAmount('');
          setDate('');
          setDescription('');
        })
        .catch((err) => console.error(err));
    };
    
    
  
  return (
    <div className="Salary-Form">
      <h2>Add Salary</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Salary</button>
      </form>
    </div>
  );
}

export default AddSalaryForm;
