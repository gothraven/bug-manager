const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const tagRoutes = require('./tag.route');
const projectRoutes = require('./project.route');
// const issueRoutes = require('./issue.route');
// const statusRoutes = require('./status.route');
// const commentRoutes = require('./comment.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
// router.use('/issues', issueRoutes);
router.use('/tags', tagRoutes);
// router.use('/status', statusRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;
