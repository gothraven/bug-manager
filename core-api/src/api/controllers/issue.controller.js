const httpStatus = require('http-status');
const Issue = require('../models/issue.model');
const Comment = require('../models/comment.model');
const Action = require('../models/action.model');

exports.load = async (req, res, next, id) => {
  try {
    const issue = await Issue.get(id);
    req.locals = { issue };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.issue.transform());

exports.create = async (req, res, next) => {
  try {
    const issue = new Issue(req.body);
    const savedIssue = await issue.save();
    res.status(httpStatus.CREATED);
    res.json(savedIssue.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const issue = Object.assign(req.locals.issue, req.body);

  issue
    .save()
    .then(savedTag => res.json(savedTag.transform()))
    .catch(e => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const issues = await Issue.list(req.query);
    const transformedIssues = issues.map(issue => issue.transform());
    res.json(transformedIssues);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { issue } = req.locals;

  issue
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

exports.getComment = async (req, res, next) => {
  try {
    const comments = await Comment.list({ issueId: req.query });
    const transformedComments = comments.map(comment => comment.transform());
    res.json(transformedComments);
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const actions = await Action.list({ issueId: req.query });
    const transformedActions = actions.map(action => action.transform());
    res.json(transformedActions);
  } catch (error) {
    next(error);
  }
};
