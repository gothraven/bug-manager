import { combineResolvers, skip } from 'graphql-resolvers';
import { ADMIN } from '../../models/user.model';

export const isAuthenticated = (parent, args, { me }) =>
  (me ? skip : new Error('Not authenticated'));

export const authorize = role =>
  combineResolvers(isAuthenticated, (parent, args, { me }) => {
    if (me.role === ADMIN || role === me.role) {
      return skip;
    }
    return new Error(`Not authorized as ${role}`);
  });
export const authorize2 = creatorId =>
  combineResolvers(isAuthenticated, (parent, args, { me }) => {
    if (me.role === ADMIN && creatorId === me.id) {
      return skip;
    }
    return new Error(`This user is not authorized as ${creatorId}`);
  });
