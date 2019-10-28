const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Comment = require('../models/comment.model');

exports.load = async (req, res, next, id) => {
  try {
    const comment = await Comment.get(id);
    if (req.user.id !== comment.userId) {
      throw new APIError({
        message: 'Comment does not belong to this user',
        status: httpStatus.FORBIDDEN
      });
    }
    req.locals = { comment };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    req.body.userId = user.id;
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    res.status(httpStatus.CREATED);
    res.json(savedComment.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const comment = Object.assign(req.locals.tag, req.body);

  comment
    .save()
    .then(savedComment => res.json(savedComment.transform()))
    .catch(e => next(e));
};

exports.remove = (req, res, next) => {
  const { comment } = req.locals;

  comment
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
