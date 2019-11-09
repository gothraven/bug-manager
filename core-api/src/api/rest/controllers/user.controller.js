import httpStatus from 'http-status';
import { omit } from 'lodash';
import User from '../../models/user.model';

exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.user.transform());

exports.loggedIn = (req, res) => res.json(req.user.transform());

exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

exports.update = (req, res, next) => {
  const ommitRole = req.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUser);

  user
    .save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateEmail(e)));
};

exports.list = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30 } = req.query;
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json({
      page,
      perPage,
      count: transformedUsers.length,
      results: transformedUsers
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
