// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
// const cors = require('cors');
import cors from 'cors';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
  origin: "https://bhautik2005.pages.dev", // your Cloudflare URL
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



export const sendContactEmail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // YOU receive message
    subject: `📩 ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Portfolio Message 🚀</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `
  });
};

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

// POST contact message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save in DB (optional but good)
    const newMessage = new Message(req.body);
    await newMessage.save();

    // Send Email to YOU
    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({ message: "Message sent successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
