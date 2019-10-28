const httpStatus = require('http-status');
const Tag = require('../models/tag.model');

exports.load = async (req, res, next, id) => {
  try {
    const tag = await Tag.get(id);
    req.locals = { tag };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.tag.transform());

exports.create = async (req, res, next) => {
  try {
    const tag = new Tag(req.body);
    const savedTag = await tag.save();
    res.status(httpStatus.CREATED);
    res.json(savedTag.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const tag = Object.assign(req.locals.tag, req.body);

  tag
    .save()
    .then(savedTag => res.json(savedTag.transform()))
    .catch(e => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const tags = await Tag.list(req.query);
    const transformedTags = tags.map(tag => tag.transform());
    res.json(transformedTags);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { tag } = req.locals;

  tag
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
