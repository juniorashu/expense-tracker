// src/components/Layout.jsx
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          paddingLeft: '20px', // Space from the left
          height: '100vh', // Ensures the container spans the full viewport height
        }}
      >
        <div style={{ width: '250px' }}> {/* Sidebar with fixed width */}
          <Sidebar />
        </div>
        <div
          style={{
            flex: 1, // Main content takes the remaining space
            padding: '20px', // Space inside the main content
            boxSizing: 'border-box', // Ensures padding doesn't affect width
            overflow: 'auto', // Ensures content doesn't overflow
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
