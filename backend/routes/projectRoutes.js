import express from 'express';
import { getAllProjects, createProject, deleteProject, updateProject, seedProjects } from '../controllers/projectController.js';
import authenticateAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', authenticateAdmin, createProject);
router.put('/:id', authenticateAdmin, updateProject);
router.delete('/:id', authenticateAdmin, deleteProject);
router.post('/seed', authenticateAdmin, seedProjects);

export default router;
