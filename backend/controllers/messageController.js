import Message from '../models/Message.js';
import sendContactEmail from '../utils/emailService.js';

let lastRequestTime = 0;

export const sendMessage = async (req, res) => {
  const now = Date.now();

  if (now - lastRequestTime < 5000) {
    return res.status(429).json({ message: 'Please wait before sending again' });
  }

  lastRequestTime = now;

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // 1️⃣ Save to DB first
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // 2️⃣ Respond to user IMMEDIATELY — don't wait for email
    res.status(200).json({ message: 'Message sent successfully ✅' });

    // 3️⃣ Send email in the background (fire-and-forget)
    sendContactEmail({ name, email, subject, message }).catch((err) => {
      console.error('❌ Background email failed:', err.message);
    });

  } catch (err) {
    console.error('❌ API Error:', err);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};


// GET all messages (Admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE a message (Admin only)
export const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: err.message });
  }
};
