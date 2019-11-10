export default {
  Change: {
    creator: async (change, args, { loaders }) => loaders.users.load(change.creatorId),
    issue: async (change, args, { loaders }) => loaders.issues.load(change.issueId)
  },
  ChangeData: {
    user: async (changeData, args, { loaders }) =>
      changeData.userId && loaders.users.load(changeData.userId),
    issue: async (changeData, args, { loaders }) =>
      changeData.issueId && loaders.issues.load(changeData.issueId),
    tag: async (changeData, args, { loaders }) =>
      changeData.tagId && loaders.tags.load(changeData.tagId),
    status: async (changeData, args, { loaders }) =>
      changeData.statusId && loaders.statuses.load(changeData.statusId),
    project: async (changeData, args, { loaders }) =>
      changeData.projectId && loaders.projects.load(changeData.projectId)
  }
};
