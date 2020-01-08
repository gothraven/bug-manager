import { combineResolvers } from "graphql-resolvers";
import { omitBy, isNil } from "lodash";
import { authorize } from "./auth.resolver";
import { ADMIN, DEVELOPER } from "../../models/user.model";
import { Paginate } from "./pagination.resolver";

export default {
  Query: {
    project: combineResolvers(
      authorize(DEVELOPER),
      async (parent, { id }, { models }) => models.Project.findById(id)
    ),
    projects: combineResolvers(authorize(DEVELOPER), Paginate("Project"))
  },
  Mutation: {
    createProject: combineResolvers(
      authorize(ADMIN),
      async (parent, { name, description }, { models }) =>
        models.Project.create({ name, description })
    ),

    updateProject: combineResolvers(
      authorize(ADMIN),
      async (parent, { id, name, description }, { models }) => {
        const options = omitBy({ name, description }, isNil);
        if (name === "" || description === "") {
          return new Error("name or description should not be empty");
        }
        return models.Project.findByIdAndUpdate(id, options, { new: true });
      }
    ),

    deleteProject: combineResolvers(
      authorize(ADMIN),
      async (parent, { id }, { models }) => {
        const project = await models.Project.findById(id);
        if (project) {
          await project.remove();
          return true;
        }
        return false;
      }
    )
  }
};
