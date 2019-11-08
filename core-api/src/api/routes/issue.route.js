const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/issue.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { issue, listIssue, createIssue, updateIssue } = require('../validations/issue.validation');

const router = express.Router();

router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listIssue), controller.list)
  .post(authorize(LOGGED_USER), validate(createIssue), controller.create);

router
  .route('/:issueId')
  .get(authorize(LOGGED_USER), validate(issue), controller.get)
  .patch(authorize(ADMIN), validate(updateIssue), controller.update)
  .delete(authorize(ADMIN), validate(issue), controller.delete);

router
  .route('/:issueId/comments')
  .get(authorize(LOGGED_USER), validate(issue), controller.getComments);

router
  .route('/:issueId/history')
  .get(authorize(LOGGED_USER), validate(issue), controller.getHistory);

/**
 * TODO: POST /v1/auth/reset-password
 */

module.exports = router;
