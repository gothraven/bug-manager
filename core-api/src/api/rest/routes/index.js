import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import tagRoutes from './tag.route';
import statusRoutes from './status.route';
import commentRoutes from './comment.route';
import projectRoutes from './project.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tags', tagRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);
router.use('/statuses', statusRoutes);

export default router;
