import { combineResolvers } from 'graphql-resolvers';
import { omitBy, isNil } from 'lodash';
import { authorize, authorize2 } from './auth.resolver';
import { ADMIN } from '../../models/user.model';
import { Paginate } from './pagination.resolver';

export default {
  Query: {
    comment: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) =>
      models.Comment.findById(id)),
    comments: combineResolvers(authorize(ADMIN), Paginate('Comment'))
  },
  Mutation: {
    createComment: combineResolvers(
      authorize(ADMIN),
      async (parent, { content, issueId }, { models, me }) =>
        models.Comment.create({ creatorId: me.id, issueId, content })
    ),

    updateComment: combineResolvers(
      authorize(ADMIN),
      async (parent, { id, content }, { models }) => {
        const options = omitBy({ content }, isNil);
        return models.Comment.findByIdAndUpdate(id, options, { new: true });
      }
    ),

    deleteComment: combineResolvers(authorize2(ADMIN), async (parent, { id }, { models }) => {
      const comment = await models.Comment.findById(id);

      if (comment) {
        await comment.remove();
        return true;
      }
      return false;
    })
  }
};
