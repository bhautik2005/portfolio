import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
const corsOrigin = (origin, callback) => {
  if (!origin) return callback(null, true);
  const allowed =
    origin === 'https://bhautik2005.pages.dev' ||
    origin === 'https://www.bhautik2005.pages.dev' ||
    /^https:\/\/[a-z0-9-]+\.pages\.dev$/i.test(origin) ||
    /^http:\/\/localhost:\d+$/.test(origin);
  if (allowed) return callback(null, true);
  callback(null, false);
};

app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-password'],
}));
app.use(express.json());

// ─── Database Connection ──────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
