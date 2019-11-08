import { combineResolvers, skip } from 'graphql-resolvers';
// import { ADMIN } from '../../models/user.model';

export const isAuthenticated = (parent, args, { me }) =>
  (me ? skip : new Error('Not authenticated as user.'));

export const isAdmin = combineResolvers(isAuthenticated, (parent, args, { me: { role } }) =>
  (role === 'ADMIN' ? skip : new Error('Not authorized as admin.')));
