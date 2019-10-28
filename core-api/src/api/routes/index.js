const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const tagRoutes = require('./tag.route');
const commentRoutes = require('./comment.route');
const projectRoutes = require('./project.route');
// const issueRoutes = require('./issue.route');
// const statusRoutes = require('./status.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tags', tagRoutes);
router.use('/comment', commentRoutes);
router.use('/projects', projectRoutes);
// router.use('/issues', issueRoutes);
// router.use('/status', statusRoutes);

module.exports = router;
