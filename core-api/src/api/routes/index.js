const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const tagRoutes = require('./tag.route');
const statusRoutes = require('./status.route');
const commentRoutes = require('./comment.route');
const projectRoutes = require('./project.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tags', tagRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);
router.use('/statuses', statusRoutes);

module.exports = router;
