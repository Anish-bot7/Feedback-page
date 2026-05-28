import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'

const Home = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <div
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '3rem',
        width: '90%',
        maxWidth: '500px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      <h1 className="mb-4 fw-bold">Welcome to the Feedback Portal</h1>

      <div className="d-grid gap-3">
       <Link to="/user/login" className="glass-btn btn-user">
  Login as User
</Link>

<Link to="/user/register" className="glass-btn btn-register">
  Register as User
</Link>

<Link to="/admin/login" className="glass-btn btn-admin">
  Login as Admin
</Link>

      </div>
    </div>
  </div>
);

export default Home;
