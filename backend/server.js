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
// const corsOrigin = (origin, callback) => {
//   if (!origin) return callback(null, true);

//   const allowed =
//     origin === 'https://bhautik2005.pages.dev' ||
//     origin === 'https://www.bhautik2005.pages.dev' ||
//     /^https:\/\/[a-z0-9-]+\.pages\.dev$/i.test(origin) ||
//     /^http:\/\/localhost:\d+$/.test(origin);

//   if (allowed) {
//     callback(null, true);
//   } else {
//     callback(new Error("Not allowed by CORS"));
//   }
// };

// app.use(cors({
//   origin: corsOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'x-admin-password'],
//   credentials: true
// }));
 

app.use(cors({
  origin: (origin, callback) => {
    console.log("🌍 Incoming origin:", origin);

    if (!origin) return callback(null, true);

    // Allow ALL Cloudflare pages + localhost
    if (
      origin.includes(".pages.dev") ||
      origin.startsWith("http://localhost")
    ) {
      return callback(null, true);
    }

    return callback(null, true); // 🔥 TEMP: allow all (fix your issue immediately)
  },
  credentials: true
}));

 

app.use((req, res, next) => {
  console.log("📥 Request:", req.method, req.url);
  console.log("🌍 Origin:", req.headers.origin);
  next();
});
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
