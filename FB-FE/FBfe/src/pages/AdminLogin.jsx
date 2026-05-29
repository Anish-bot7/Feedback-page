import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('${import.meta.env.VITE_API_URL}/admin/login', form);
      localStorage.setItem('admin', form.username);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #000000, #434343)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Card
        style={{
          width: '25rem',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '15px',
          color: 'white',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4 fs-4 fw-bold">Admin Login</Card.Title>
          <Form onSubmit={loginAdmin}>
            <Form.Group className="mb-3" controlId="adminUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="adminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="danger" type="submit" className="fw-semibold">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminLogin;
