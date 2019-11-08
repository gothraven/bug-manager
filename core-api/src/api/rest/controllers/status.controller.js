import httpStatus from 'http-status';
import Status from '../../models/status.model';

exports.load = async (req, res, next, id) => {
  try {
    const status = await Status.get(id);
    req.locals = { status };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.status.transform());

exports.create = async (req, res, next) => {
  try {
    const status = new Status(req.body);
    const savedStatus = await status.save();
    res.status(httpStatus.CREATED);
    res.json(savedStatus.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const status = Object.assign(req.locals.status, req.body);

  status
    .save()
    .then(savedStatus => res.json(savedStatus.transform()))
    .catch(e => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const statuses = await Status.list();
    const transformedStatuses = statuses.map(status => status.transform());
    res.json(transformedStatuses);
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { status } = req.locals;

  status
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
