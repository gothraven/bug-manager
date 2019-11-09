import httpStatus from 'http-status';
import Project from '../../models/project.model';

exports.load = async (req, res, next, id) => {
  try {
    const project = await Project.get(id);
    req.locals = { project };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.project.transform());

exports.create = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(httpStatus.CREATED);
    res.json(savedProject.transform());
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  const project = Object.assign(req.locals.project, req.body);

  project
    .save()
    .then(savedProject => res.json(savedProject.transform()))
    .catch(e => next(e));
};

exports.list = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30 } = req.query;
    const projects = await Project.list(req.query);
    const transformedProjects = projects.map(project => project.transform());
    res.json({
      page,
      perPage,
      count: transformedProjects.length,
      results: transformedProjects
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = (req, res, next) => {
  const { project } = req.locals;

  project
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
