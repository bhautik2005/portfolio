import express from 'express';
import { verifyAdmin } from '../controllers/adminController.js';
import authenticateAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify', authenticateAdmin, verifyAdmin);

export default router;
