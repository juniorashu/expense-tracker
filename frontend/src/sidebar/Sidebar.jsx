import { Link } from 'react-router-dom';
import userAvatar from '../assets/avatar.jpg'; // Make sure you have this avatar

export default function Sidebar() {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      
      {/* Top Section: User Info and Navigation */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px' // small space between Mike and Your Money
      }}>
        <img 
          src={userAvatar} 
          alt="User Avatar" 
          style={{ width: '80px', height: '80px', borderRadius: '50%' }}
        />
        <h2 style={{ fontSize: '18px', color: '#2c3e50', margin: 0 }}>Mike</h2>
        <p style={{ fontSize: '12px', color: '#7f8c8d', margin: 0 }}>Your Money</p>

        {/* Menu Links */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '30px', // space between "Your Money" and menu
          alignItems: 'flex-start',
          width: '100%',
          paddingLeft: '40px'
        }}>
          <Link to="/" style={linkStyle}>📈 Dashboard</Link>
          <Link to="/transactions" style={linkStyle}>📄 View Transactions</Link>
          <Link to="/income" style={linkStyle}>💰 Incomes</Link>
          <Link to="/expenses" style={linkStyle}>💸 Expenses</Link>
        </nav>
      </div>

      {/* Bottom Section: Sign Out Button */}
      <div style={{ marginBottom: '70px' }}>
        <button style={{
          backgroundColor: '#e74c3c',
          border: 'none',
          padding: '10px 20px',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// Link Styling
const linkStyle = {
  textDecoration: 'none',
  color: '#2c3e50',
  fontSize: '16px',
  fontWeight: '500'
};
