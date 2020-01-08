import { combineResolvers } from "graphql-resolvers";
import { omitBy, isNil } from "lodash";
import { authorize, own, objectExists } from "./auth.resolver";
import { USER, ADMIN } from "../../models/user.model";
import { Paginate } from "./pagination.resolver";

export default {
  Query: {
    comment: combineResolvers(
      authorize(ADMIN),
      async (parent, { id }, { models }) => models.Comment.findById(id)
    ),
    comments: combineResolvers(authorize(ADMIN), Paginate("Comment"))
  },
  Mutation: {
    createComment: combineResolvers(
      authorize(USER),
      objectExists("Issue", "issueId"),
      async (parent, { content, issueId }, { models, me }) =>
        models.Comment.create({ creatorId: me.id, issueId, content })
    ),

    updateComment: combineResolvers(
      authorize(USER),
      own("Comment"),
      async (parent, { id, content }, { models }) => {
        const options = omitBy({ content }, isNil);
        if (content === "") {
          return new Error("content should not be empty");
        }
        return models.Comment.findByIdAndUpdate(id, options, { new: true });
      }
    ),

    deleteComment: combineResolvers(
      authorize(USER),
      own("Comment"),
      async (parent, { id }, { models }) => {
        const comment = await models.Comment.findById(id);

        if (comment) {
          await comment.remove();
          return true;
        }
        return false;
      }
    )
  },
  Comment: {
    creator: async (comment, args, { loaders }) =>
      loaders.users.load(comment.creatorId),
    issue: async (comment, args, { loaders }) =>
      loaders.issues.load(comment.issueId)
  }
};
