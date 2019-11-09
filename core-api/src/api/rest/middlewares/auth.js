import httpStatus from 'http-status';
import passport from 'passport';
import User from '../../models/user.model';
import APIError from '../../utils/APIError';

export const ADMIN = 'admin';
export const LOGGED_USER = 'user';

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (user.role !== ADMIN && !roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

export const authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))(
    req,
    res,
    next
  );
