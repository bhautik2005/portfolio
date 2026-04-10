import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  linkUrl: String,
  codeUrl: String,
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
