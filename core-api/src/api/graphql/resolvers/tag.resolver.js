import { combineResolvers } from 'graphql-resolvers';
import { authorize } from './auth.resolver';
import { USER, ADMIN } from '../../models/user.model';
import { Paginate } from './pagination.resolver';

export default {
  Query: {
    tag: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) =>
      models.Tag.findById(id)),
    tags: combineResolvers(authorize(USER), Paginate('Tag'))
  }
};
