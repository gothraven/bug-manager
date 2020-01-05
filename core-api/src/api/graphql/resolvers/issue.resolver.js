import { combineResolvers, pipeResolvers } from "graphql-resolvers";
import { omitBy, isNil } from "lodash";
import { authorize, own, objectExists } from "./auth.resolver";
import { USER, ADMIN, DEVELOPER } from "../../models/user.model";
import { Paginate } from "./pagination.resolver";
import {
  ASSIGN_USER,
  UNASSIGN_USER,
  ADD_TAG,
  REMOVE_TAG,
  ATTACH_TO_PROJECT,
  DETATCH_FROM_PROJECT,
  CHANGE_STATUS,
  CLOSE_ISSUE,
  REOPEN_ISSUE
} from "../../models/change.model";

const recordChange = (type, objectId) => async (root, args, { models, me }) => {
  const data = objectId ? { [objectId]: args[objectId] } : {};
  models.Change.create({
    creatorId: me.id,
    issueId: args.id,
    type,
    data
  });
  return root;
};

export default {
  Query: {
    issue: combineResolvers(
      authorize(USER),
      async (parent, { id }, { models }) => models.Issue.findById(id)
    ),
    issues: combineResolvers(authorize(USER), Paginate("Issue"))
  },
  Mutation: {
    createIssue: combineResolvers(
      authorize(USER),
      async (parent, { title, content }, { models, me }) => {
        const issue = await models.Issue.create({ title, creatorId: me.id });
        await models.Comment.create({
          creatorId: me.id,
          issueId: issue.id,
          content
        });
        return issue;
      }
    ),
    updateIssue: combineResolvers(
      authorize(USER),
      own("Issue"),
      async (parent, { id, title }, { models }) => {
        const options = omitBy({ title }, isNil);
        const issue = models.Issue.findByIdAndUpdate(id, options, {
          new: true
        });
        return issue || new Error("Something went wrong");
      }
    ),
    assignUser: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("User", "userId"),
      async (parent, { id, userId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { $addToSet: { assignedUserIds: userId } },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(ASSIGN_USER, "userId")
    ),
    unassignUser: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("User", "userId"),
      async (parent, { id, userId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { $pull: { assignedUserIds: userId } },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(UNASSIGN_USER, "userId")
    ),
    addTag: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("Tag", "tagId"),
      async (parent, { id, tagId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { $addToSet: { tagIds: tagId } },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(ADD_TAG, "tagId")
    ),
    removeTag: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("Tag", "tagId"),
      async (parent, { id, tagId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { $pull: { tagIds: tagId } },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(REMOVE_TAG, "tagId")
    ),
    attachToProject: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("Project", "projectId"),
      async (parent, { id, projectId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { projectId },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(ATTACH_TO_PROJECT, "projectId")
    ),
    detatchFromProject: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("Project", "projectId"),
      async (parent, { id }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { projectId: null },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(DETATCH_FROM_PROJECT, "projectId")
    ),
    updateIssueStatus: pipeResolvers(
      authorize(DEVELOPER),
      objectExists("Status", "statusId"),
      async (parent, { id, statusId }, { models }) => {
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { statusId },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(CHANGE_STATUS, "statusId")
    ),
    closeIssue: pipeResolvers(
      authorize(DEVELOPER),
      async (parent, { id }, { models }) => {
        console.log("----------Close Issue---------------");
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { open: false },
          { new: true }
        );
        console.log("----------Close end  Issue---------------");
        return issue || new Error("Something went wrong");
      },
      recordChange(CLOSE_ISSUE)
    ),
    reopenIssue: pipeResolvers(
      authorize(DEVELOPER),
      async (parent, { id }, { models }) => {
        console.log("----------Reopen Issue---------------");
        const issue = await models.Issue.findByIdAndUpdate(
          id,
          { open: true },
          { new: true }
        );
        return issue || new Error("Something went wrong");
      },
      recordChange(REOPEN_ISSUE)
    ),
    deleteIssue: combineResolvers(
      authorize(ADMIN),
      async (parent, { id }, { models }) => {
        const issue = await models.Issue.findById(id);

        if (issue) {
          await issue.remove();
          return true;
        }
        return false;
      }
    )
  },
  Issue: {
    creator: async (issue, args, { loaders }) =>
      loaders.users.load(issue.creatorId),
    status: async (issue, args, { loaders }) =>
      issue.statusId && loaders.statuses.load(issue.statusId),
    assignedUsers: async (issue, args, { loaders }) =>
      loaders.users.loadMany(issue.assignedUserIds),
    tags: async (issue, args, { loaders }) =>
      loaders.tags.loadMany(issue.tagIds),
    project: async (issue, args, { loaders }) =>
      issue.projectId && loaders.projects.load(issue.projectId),
    changes: async (issue, args, { models }) =>
      models.Change.find({ issueId: issue.id }),
    comments: async (issue, args, { models }) =>
      models.Comment.find({ issueId: issue.id })
  }
};
