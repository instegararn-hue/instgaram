const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const mongoose = require('mongoose');
const path     = require('path');

dotenv.config();

const app       = express();
const PORT      = process.env.PORT      || 4000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());

// ── API routes ──────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => {
  const state  = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ server: 'OK', mongodb: states[state] || 'unknown' });
});

// ── Serve frontend static files ─────────────────────────────────
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Connect to MongoDB then start server ────────────────────────
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
  })
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully');
  })
  .catch(err => {
    if (err.message.includes('whitelist') || err.message.includes('IP')) {
      console.error('❌ Atlas IP not whitelisted!');
      console.error('   Fix: Atlas → Network Access → Add IP → Allow Access From Anywhere');
    } else {
      console.error('❌ MongoDB connection failed:', err.message);
    }
    console.log('⚠️  DB operations will fail — server still starting...');
  });

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
