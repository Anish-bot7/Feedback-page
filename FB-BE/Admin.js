const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://feedback-page-umber.vercel.app'
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('MongoDB error ❌', err));

// Models
const Admin = mongoose.model('admin', new mongoose.Schema({
  username: String,
  password: String
}));

const User = mongoose.model('user', new mongoose.Schema({
  username: String,
  password: String
}));

const Feedback = mongoose.model('suggestion', new mongoose.Schema({
  username: String, // link feedback to user
  email: String,
  message: String,
  reply: String
}));

// ======================= ADMIN ROUTES =======================

// Admin Login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  res.status(200).json({ message: 'Admin login successful' });
});

// Get All Feedbacks
app.get('/admin/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// Reply to feedback
app.put('/admin/feedback/:id/reply', async (req, res) => {
  const { reply } = req.body;
  try {
    await Feedback.findByIdAndUpdate(req.params.id, { reply });
    res.json({ message: 'Reply sent!' });
  } catch {
    res.status(500).json({ error: 'Reply failed' });
  }
});

// ======================= USER ROUTES =======================

// User Register
app.post('/user/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'Username already exists' });

  await User.create({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// User Login
app.post('/user/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.status(200).json({ message: 'User login successful' });
});

// Submit Feedback
app.post('/feedback', async (req, res) => {
  const { username, email, message } = req.body;
  try {
    await Feedback.create({ username, email, message });
    res.status(201).json({ message: 'Feedback submitted!' });
  } catch {
    res.status(500).json({ error: 'Feedback failed' });
  }
});

// Get Feedbacks by Username (for user view)
app.get('/user/:username/feedbacks', async (req, res) => {
  const { username } = req.params;
  try {
    const feedbacks = await Feedback.find({ username });
    res.status(200).json(feedbacks);
  } catch {
    res.status(500).json({ error: 'Failed to fetch user feedbacks' });
  }
});

// Start Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
