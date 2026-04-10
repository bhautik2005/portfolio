import Project from '../models/Project.js';

// GET all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new project (Admin only)
export const createProject = async (req, res) => {
  try {
    const { title, description, tags, linkUrl, codeUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const newProject = new Project({ title, description, tags, linkUrl, codeUrl });
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE project (Admin only)
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT update project (Admin only)
export const updateProject = async (req, res) => {
  try {
    const { title, description, tags, linkUrl, codeUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, tags, linkUrl, codeUrl },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully', project: updated });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: err.message });
  }
};


// POST seed projects (Admin only)
export const seedProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    const seedData = [
      {
        title: 'AI-Powered Heart Disease Prediction System',
        description: 'End-to-end machine learning application that predicts heart disease using clinical data.',
        tags: ['Python', 'Flask', 'Scikit-learn', 'Machine Learning'],
        linkUrl: 'http://heart-react-app.s3-website.ap-south-1.amazonaws.com',
        codeUrl: 'https://github.com/bhautik2005/heart_disease_project',
      },
      {
        title: 'Nest – Full Stack Booking Platform',
        description: 'MERN stack application for property booking with authentication and CRUD operations.',
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        linkUrl: 'http://Nest-env.eba-xvf3vp3w.ap-south-1.elasticbeanstalk.com',
        codeUrl: 'https://github.com/bhautik2005/Nest',
      },
      {
        title: 'PassOp – Password Manager',
        description: 'Secure password manager web app for storing and managing credentials.',
        tags: ['JavaScript', 'Security', 'Web App'],
        linkUrl: 'https://passop.pages.dev/',
        codeUrl: 'https://github.com/bhautik2005/PassOp',
      },
    ];
    await Project.insertMany(seedData);
    res.json({ message: 'Database seeded successfully', count: seedData.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
