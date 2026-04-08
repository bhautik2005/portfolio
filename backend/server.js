// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
// const cors = require('cors');
import cors from 'cors';
// require('dotenv').config();
import rateLimit from "express-rate-limit";
import dotenv from 'dotenv';
import validator from "validator";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
  origin: "https://bhautik2005.pages.dev/", // your Cloudflare URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
// || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  linkUrl: String,
  codeUrl: String,
});
const Project = mongoose.model('Project', ProjectSchema);

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);



// Routes
// Seed initial data routing just to populate the DB easily
app.post('/api/seed', async (req, res) => {
  try {
    await Project.deleteMany({});
    const seedProjects = [
      {
        title: "Full-Stack Property Booking Platform",
        description: "A high-performance real estate solution featuring real-time availability and secure transactions.",

        tags: ["Node.js", "MongoDB"],
        linkUrl: "#",
        codeUrl: "#"
      },
      {
        title: "Market Trend Predictive Engine",
        description: "Analyzing multi-dimensional datasets to forecast retail market shifts with 94% accuracy.",

        tags: ["Python", "Scikit-Learn"],
        linkUrl: "#",
        codeUrl: "#"
      },
      {
        title: "Neural Mesh Visualizer",
        description: "Real-time visualization of machine learning model layers and weighted pathways.",

        tags: ["React", "D3.js"],
        linkUrl: "#",
        codeUrl: "#"
      }, {
        title: "AI-Powered Heart Disease Prediction System",
        description: "End-to-end machine learning application that predicts heart disease using clinical data. Built with a Flask REST API and integrated frontend for real-time predictions.",

        tags: ["Python", "Flask", "Scikit-learn", "Machine Learning"],
        linkUrl: "http://heart-react-app.s3-website.ap-south-1.amazonaws.com",
        codeUrl: "https://github.com/bhautik2005/heart_disease_project"
      },
      {
        title: "Next Word Predictor (LSTM NLP)",
        description: "Deep learning-based NLP system that predicts the next word in a sentence using LSTM networks with sequential text modeling and real-time inference.",

        tags: ["Python", "LSTM", "NLP", "Deep Learning", "Flask"],
        linkUrl: "#",
        codeUrl: "https://github.com/bhautik2005/Next_Prediction-LSTM-"
      },
      {
        title: "Nest – Full Stack Booking Platform",
        description: "MERN stack application for property booking with authentication, CRUD operations, and scalable backend APIs for managing users and listings.",

        tags: ["MongoDB", "Express", "React", "Node.js", "Authentication", "REST API", "Cloud Deployment"],
        linkUrl: "http://Nest-env.eba-xvf3vp3w.ap-south-1.elasticbeanstalk.com",
        codeUrl: "https://github.com/bhautik2005/Nest"
      },
      {
        title: "AI PDF Chatboard",
        description: "AI-powered document assistant that allows users to interact with PDF files using semantic search, embeddings, and intelligent question answering.",

        tags: ["Python", "AI", "NLP", "Embeddings", "Semantic Search"],
        linkUrl: "#",
        codeUrl: "https://github.com/bhautik2005/AI_pdf_chatboard"
      },
      {
        title: "Text Emotion Detection App",
        description: "Machine learning web app that classifies emotions from text in real time using NLP preprocessing and trained classification models.",

        tags: ["NLP", "Machine Learning", "Flask", "Text Classification"],
        linkUrl: "#",
        codeUrl: "https://github.com/bhautik2005/emotion_app"
      },
      {
        title: "Movie Review IMDB Sentiment Analysis Engine",
        description: "Sentiment analysis system that classifies movie reviews as positive or negative using NLP techniques and machine learning models.",

        tags: ["Python", "NLP", "Sentiment Analysis", "ML"],
        linkUrl: "#",
        codeUrl: "https://github.com/bhautik2005/imdb-sentiment-analyzer-"
      },
      {
        title: "Student Performance Prediction System",
        description: "Regression-based ML model that predicts student performance based on study-related features with data preprocessing and evaluation.",

        tags: ["Python", "Regression", "Machine Learning"],
        linkUrl: "http://Score-prediction-app-env.eba-ssqywhgg.ap-south-1.elasticbeanstalk.com",
        codeUrl: "https://github.com/bhautik2005/Score_Prediction"
      },
      {
        title: "PassOp – Password Manager",
        description: "Secure password manager web app for storing and managing credentials with encryption and user-friendly interface.",

        tags: ["JavaScript", "Security", "Web App"],
        linkUrl: "https://passop.pages.dev/",
        codeUrl: "https://github.com/bhautik2005/PassOp"
      }
    ];
    await Project.insertMany(seedProjects);
    res.json({ message: "Database seeded successfully", count: seedProjects.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ✅ Email Function
const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password (NOT gmail password)
      }
    });

    // 🔥 Check connection
    await transporter.verify();
    console.log("✅ SMTP Ready");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, // 👈 important

      subject: `📩 ${subject}`,

      html: `
        <h2>New Message 🚀</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 ,// max 5 requests 
  message: {
    error: "Too many messages sent. Try again after 15 minutes."
  }

});

app.use("/api/messages", limiter);
// ✅ API Route

let lastRequestTime = 0;
app.post("/api/messages", async (req, res) => {
   const now = Date.now();

  if (now - lastRequestTime < 5000) {
    return res.status(429).json({ message: "Please wait before sending again" });
  }

  lastRequestTime = now;
  try {
    const { name, email, subject, message } = req.body;

    // 🔥 Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }
     // ✅ SAVE DATA
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // 🔥 Send Email
    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({ message: "Message sent successfully ✅" });

  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ message: "Email failed ❌" });
  }
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
