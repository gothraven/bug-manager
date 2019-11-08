import { combineResolvers, skip } from 'graphql-resolvers';
import { ADMIN } from '../../models/user.model';

export const isAuthenticated = (parent, args, { me }) =>
  (me ? skip : new Error('Not authenticated as user'));

export const authorize = role =>
  combineResolvers(isAuthenticated, (parent, args, { me }) => {
    if (me.role === ADMIN || role === me.role) {
      return skip;
    }
    return new Error(`Not authorized as ${role}`);
  });
