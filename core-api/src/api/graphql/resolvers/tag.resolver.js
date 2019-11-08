export default {
  Query: {
    tag: async (parent, { id }, { models }) => models.Tag.findById(id),
    tags: (parent, args, { models }) => models.Tag.find()
  }
};
