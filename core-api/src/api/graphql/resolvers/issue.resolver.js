import { combineResolvers } from 'graphql-resolvers';
import { omitBy, isNil } from 'lodash';
import { authorize, own, objectExists } from './auth.resolver';
import { USER, ADMIN } from '../../models/user.model';
import { Paginate } from './pagination.resolver';

export default {
  Query: {
    issue: combineResolvers(authorize(USER), async (parent, { id }, { models }) =>
      models.Issue.findById(id)),
    issues: combineResolvers(authorize(USER), Paginate('Issue'))
  },
  Mutation: {
    createIssue: combineResolvers(
      authorize(USER),
      async (parent, { title, content }, { models, me }) =>
        models.Issue.create({ title, content, creatorId: me.id })
    ),
    updateIssue: combineResolvers(
      authorize(USER),
      own('Issue'),
      async (parent, { id, title, content }, { models }) => {
        const options = omitBy({ title, content }, isNil);
        return models.Issue.findByIdAndUpdate(id, options, { new: true });
      }
    ),
    assignUser: combineResolvers(
      authorize(USER),
      objectExists('User', 'userId'),
      async (parent, { id, userId }, { models }) =>
        models.Issue.findByIdAndUpdate(
          id,
          { $addToSet: { assignedUserIds: userId } },
          { new: true }
        )
    ),
    unassignUser: combineResolvers(
      authorize(USER),
      objectExists('User', 'userId'),
      async (parent, { id, userId }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { $pull: { assignedUserIds: userId } }, { new: true })
    ),
    addTag: combineResolvers(
      authorize(USER),
      objectExists('Tag', 'tagId'),
      async (parent, { id, tagId }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { $addToSet: { tagIds: tagId } }, { new: true })
    ),
    removeTag: combineResolvers(
      authorize(USER),
      objectExists('Tag', 'tagId'),
      async (parent, { id, tagId }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { $pull: { tagIds: tagId } }, { new: true })
    ),
    attachToProject: combineResolvers(
      authorize(USER),
      objectExists('Project', 'projectId'),
      async (parent, { id, projectId }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { projectId }, { new: true })
    ),
    detatchFromProject: combineResolvers(
      authorize(USER),
      objectExists('Project', 'projectId'),
      async (parent, { id }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { projectId: null }, { new: true })
    ),
    updateIssueStatus: combineResolvers(
      authorize(USER),
      objectExists('Status', 'statusId'),
      async (parent, { id, statusId }, { models }) =>
        models.Issue.findByIdAndUpdate(id, { statusId }, { new: true })
    ),
    closeIssue: combineResolvers(authorize(USER), async (parent, { id }, { models }) =>
      models.Issue.findByIdAndUpdate(id, { open: false }, { new: true })),
    deleteIssue: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) => {
      const issue = await models.Issue.findById(id);

      if (issue) {
        await issue.remove();
        return true;
      }
      return false;
    })
  },
  Issue: {
    creator: async (issue, args, { loaders }) => loaders.users.load(issue.creatorId),
    status: async (issue, args, { loaders }) =>
      issue.statusId && loaders.statuses.load(issue.statusId),
    assignedUsers: async (issue, args, { loaders }) =>
      loaders.users.loadMany(issue.assignedUserIds),
    tags: async (issue, args, { loaders }) => loaders.tags.loadMany(issue.tagIds),
    project: async (issue, args, { loaders }) =>
      issue.projectId && loaders.projects.load(issue.projectId)
  }
};
