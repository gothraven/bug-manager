import { combineResolvers, skip } from 'graphql-resolvers';
import { ADMIN } from '../../models/user.model';

export const isAuthenticated = (parent, args, { me }) =>
  (me ? skip : new Error('Not authenticated'));

export const authorize = role =>
  combineResolvers(isAuthenticated, (parent, args, { me }) => {
    if (me instanceof Error) {
      return new Error(me);
    }
    if (me.role === ADMIN || role === me.role) {
      return skip;
    }
    return new Error(`Not authorized as ${role}`);
  });

export const own = model => async (parent, { id }, { models, me }) => {
  if (me.role === ADMIN) {
    return skip;
  }
  const data = await models[model].findOne({ _id: id, creatorId: me.id });
  if (data) {
    return skip;
  }
  return new Error(`${model} does not belog to this user`);
};

export const objectExists = (model, id) => async (parent, args, { models }) => {
  const objectId = args[id];
  const data = await models[model].findOne({ _id: objectId });
  if (data) {
    return skip;
  }
  return new Error(`${model} with ID(${objectId}) does not exist`);
};
