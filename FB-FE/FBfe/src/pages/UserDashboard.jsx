import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Add this line to use external CSS

const UserDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');
  const username = localStorage.getItem('user');

  useEffect(() => {
    if (username) {
      axios.get(`${import.meta.env.VITE_API_URL}/user/${username}/feedbacks`)
        .then(res => setFeedbacks(res.data))
        .catch(() => setStatus('Error fetching feedbacks.'));
    }
  }, [username]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return alert('Fill in all fields');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, {
        username,
        email: form.email,
        message: form.message
      });
      setStatus('✅ Feedback submitted successfully!');
      setForm({ email: '', message: '' });

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${username}/feedbacks`);
      setFeedbacks(res.data);
    } catch (err) {
      setStatus('❌ Error submitting feedback');
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header text-center">
        <h2 className="fw-bold">Welcome, {username} 👋</h2>
        <p className="text-light">Submit feedback and see replies from the admin</p>
      </div>

      <div className="feedback-form card-glass mb-5">
        <h5 className="mb-3">📝 Submit Feedback</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            className="form-control mb-3"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button className="btn btn-primary w-100 fw-semibold">Submit</button>
        </form>
        {status && <p className="text-success mt-2">{status}</p>}
      </div>

      <div>
        <h4 className="text-white mb-3">📬 Your Feedbacks & Replies</h4>
        {feedbacks.length === 0 ? (
          <p className="text-light">No feedbacks submitted yet.</p>
        ) : (
          feedbacks.map(fb => (
            <div key={fb._id} className="card-glass mb-3 fade-in">
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Message:</strong> {fb.message}</p>
              <p><strong>Admin Reply:</strong> {fb.reply ? fb.reply : '⏳ No reply yet'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
