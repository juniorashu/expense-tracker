import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAvatar from '../assets/avatar.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const sidebarStyle = {
    width: isMobile ? (isOpen ? '250px' : '0') : '250px',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? (isOpen ? '20px 0' : '20px 0') : '20px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    zIndex: 1000
  };

  const menuButtonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1001,
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    display: isMobile ? 'block' : 'none'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '16px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    opacity: isMobile ? (isOpen ? 1 : 0) : 1,
    transition: 'opacity 0.3s ease'
  };

  return (
    <>
      <button onClick={toggleMenu} style={menuButtonStyle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div style={sidebarStyle}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          width: '100%'
        }}>
          <img 
            src={userAvatar} 
            alt="User Avatar" 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%',
              opacity: isMobile ? (isOpen ? 1 : 0) : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
          <h2 style={{ 
            fontSize: '18px', 
            color: '#2c3e50', 
            margin: 0,
            opacity: isMobile ? (isOpen ? 1 : 0) : 1,
            transition: 'opacity 0.3s ease'
          }}>
            Mike
          </h2>
          <p style={{ 
            fontSize: '12px', 
            color: '#7f8c8d', 
            margin: 0,
            opacity: isMobile ? (isOpen ? 1 : 0) : 1,
            transition: 'opacity 0.3s ease'
          }}>
            Your Money
          </p>

          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '30px',
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

        <div style={{ 
          marginBottom: '70px',
          opacity: isMobile ? (isOpen ? 1 : 0) : 1,
          transition: 'opacity 0.3s ease'
        }}>
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
    </>
  );
}