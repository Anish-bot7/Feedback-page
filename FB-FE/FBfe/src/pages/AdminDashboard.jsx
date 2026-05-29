import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyText, setReplyText] = useState({});
  const adminName = localStorage.getItem('admin');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('${import.meta.env.VITE_API_URL}/admin/feedbacks');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    }
  };

  const sendReply = async (id) => {
    const reply = replyText[id];
    if (!reply) return alert('Enter a reply');
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/feedback/${id}/reply`, { reply });
      fetchFeedbacks();
      setReplyText(prev => ({ ...prev, [id]: '' }));
      alert('Reply sent!');
    } catch (err) {
      alert('Reply failed');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header text-center mb-4">
        <h2 className="fw-bold">Admin Panel 👮</h2>
        <p className="lead">Welcome <span className="text-warning">{adminName}</span></p>
      </div>

      {feedbacks.length === 0 ? (
        <p className="text-center">No feedbacks available.</p>
      ) : (
        feedbacks.map(fb => (
          <div key={fb._id} className="feedback-card shadow fade-in">
            <p><strong>User:</strong> {fb.username}</p>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><strong>Reply:</strong> {fb.reply || <span className="text-muted">Not replied yet</span>}</p>

            <textarea
              className="form-control mb-2"
              placeholder="Write your reply..."
              value={replyText[fb._id] || ''}
              onChange={(e) => setReplyText({ ...replyText, [fb._id]: e.target.value })}
            ></textarea>

            <button className="btn btn-success reply-btn" onClick={() => sendReply(fb._id)}>
              ✉️ Send Reply
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
