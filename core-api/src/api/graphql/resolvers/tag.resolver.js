import { combineResolvers, pipeResolvers } from 'graphql-resolvers';
import { omitBy, isNil } from 'lodash';
import { authorize } from './auth.resolver';
import { USER, ADMIN } from '../../models/user.model';
import { Paginate, Edgify } from './pagination.resolver';

export default {
  Query: {
    tag: combineResolvers(authorize(USER), async (parent, { id }, { models }) =>
      models.Tag.findById(id)),
    tags: combineResolvers(authorize(USER), Paginate('Tag'))
  },
  Mutation: {
    createTag: pipeResolvers(
      authorize(ADMIN),
      async (parent, { name, description, color }, { models }) =>
        models.Tag.create({ name, description, color }),
      Edgify()
    ),

    updateTag: pipeResolvers(
      authorize(ADMIN),
      async (parent, { id, name, description, color }, { models }) => {
        const options = omitBy({ name, description, color }, isNil);
        return models.Tag.findByIdAndUpdate(id, options, { new: true });
      },
      Edgify()
    ),

    deleteTag: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) => {
      const tag = await models.Tag.findById(id);

      if (tag) {
        await tag.remove();
        return true;
      }
      return false;
    })
  }
};
