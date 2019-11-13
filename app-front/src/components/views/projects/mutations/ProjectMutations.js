import { useCallback } from "react";

import { graphql } from "react-relay/hooks";
import { ConnectionHandler, ROOT_ID } from "relay-runtime";

import useMutation from "../../../core/hooks/useMutation";

export const CreateProjectMutation = graphql`
  mutation ProjectMutationsCreateProjectMutation(
    $name: String!
    $description: String
  ) {
    createProject(name: $name, description: $description) {
      cursor
      node {
        id
        name
        description
      }
    }
  }
`;

const UpdateProjectMutation = graphql`
  mutation ProjectMutationsUpdateProjectMutation(
    $id: ID!
    $name: String
    $description: String
  ) {
    updateProject(id: $id, name: $name, description: $description) {
      cursor
      node {
        id
        name
        description
      }
    }
  }
`;

const DeleteProjectMutation = graphql`
  mutation ProjectMutationsDeleteProjectMutation($id: ID!) {
    deleteProject(id: $id)
  }
`;

export function useCreateProject() {
  const [isProjectCreatePending, createProject] = useMutation(CreateProjectMutation);

  const onCreateProject = useCallback(() => {
    createProject({
      variables: {
        name: "Project X",
        description: "Lorem ipsum dolor sit amet",
      },
      updater: store => {
        const root = store.get(ROOT_ID);
        if (root == null) {
          return;
        }
        const projects = ConnectionHandler.getConnection(root, "Query_projects");
        if (projects == null) {
          return;
        }
        ConnectionHandler.insertEdgeBefore(
          projects,
          store.getRootField("createProject"),
          null
        );
      }
    });
  }, [createProject]);

  return [isProjectCreatePending, onCreateProject];
}

export function useUpdateProject(id, name, description) {
  const [isProjectUpdatePending, updateProject] = useMutation(UpdateProjectMutation);

  const onUpdateProject = useCallback(() => {
    updateProject({
      variables: { id, name, description }
    });
  }, [name, description, id, updateProject]);

  return [isProjectUpdatePending, onUpdateProject];
}

export function useDeleteProject(id) {
  const [isProjectDeletePending, deleteProject] = useMutation(DeleteProjectMutation);

  const onDeleteProject = useCallback(() => {
    deleteProject({
      variables: { id },
      updater: store => {
        const root = store.get(ROOT_ID);
        if (root == null) {
          return;
        }
        const projects = ConnectionHandler.getConnection(root, "Query_projects");
        if (projects == null) {
          return;
        }
        ConnectionHandler.deleteNode(projects, id);
      }
    });
  }, [id, deleteProject]);
  return [isProjectDeletePending, onDeleteProject];
}
