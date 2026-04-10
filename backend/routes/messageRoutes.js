import express from 'express';
import { sendMessage, getAllMessages, deleteMessage } from '../controllers/messageController.js';
import authenticateAdmin from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Try again after 15 minutes.' },
});

router.post('/', limiter, sendMessage);
router.get('/', authenticateAdmin, getAllMessages);
router.delete('/:id', authenticateAdmin, deleteMessage);

export default router;
