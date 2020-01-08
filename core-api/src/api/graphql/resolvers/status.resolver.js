import { combineResolvers } from 'graphql-resolvers';
import { omitBy, isNil } from 'lodash';
import { authorize } from './auth.resolver';
import { USER, ADMIN } from '../../models/user.model';

export default {
  Query: {
    status: combineResolvers(authorize(USER), async (parent, { id }, { models }) =>
      models.Status.findById(id)),
    statuses: combineResolvers(authorize(USER), async (parent, args, { models }) =>
      models.Status.find({}))
  },
  Mutation: {
    createStatus: combineResolvers(
      authorize(ADMIN),
      async (parent, { name, description }, { models }) =>
        models.Status.create({ name, description })
    ),

    updateStatus: combineResolvers(
      authorize(ADMIN),
      async (parent, { id, name, description }, { models }) => {
        const options = omitBy({ name, description }, isNil);
        if (name === '') {
          return new Error('name should not be empty');
        }
        return models.Status.findByIdAndUpdate(id, options, { new: true });
      }
    ),

    deleteStatus: combineResolvers(
      authorize(ADMIN),
      async (parent, { id }, { models }) => {
        const status = await models.Status.findById(id);

        if (status) {
          await status.remove();
          return true;
        }
        return false;
      }
    )
  }
};
