import { useCallback } from "react";

import { graphql } from "react-relay/hooks";
import { ConnectionHandler, ROOT_ID } from "relay-runtime";

import useMutation from "../../../core/hooks/useMutation";

export const CreateTagMutation = graphql`
  mutation TagMutationsCreateTagMutation(
    $name: String!
    $description: String
    $color: HexColorCode!
  ) {
    createTag(name: $name, description: $description, color: $color) {
      cursor
      node {
        id
        name
        description
        color
      }
    }
  }
`;

const UpdateTagMutation = graphql`
  mutation TagMutationsTagPanelUpdateTagMutation(
    $id: ID!
    $name: String
    $description: String
    $color: HexColorCode
  ) {
    updateTag(id: $id, name: $name, description: $description, color: $color) {
      cursor
      node {
        id
        name
        description
        color
      }
    }
  }
`;

const DeleteTagMutation = graphql`
  mutation TagMutationsTagPanelDeleteTagMutation($id: ID!) {
    deleteTag(id: $id)
  }
`;

export function useCreateTag() {
  const [isTagCreatePending, createTag] = useMutation(CreateTagMutation);

  const onCreateTag = useCallback(() => {
    createTag({
      variables: {
        name: "Tag",
        description: "",
        color: "#22194D"
      },
      updater: store => {
        const root = store.get(ROOT_ID);
        if (root == null) {
          return;
        }
        const tags = ConnectionHandler.getConnection(root, "Query_tags");
        if (tags == null) {
          return;
        }
        ConnectionHandler.insertEdgeBefore(
          tags,
          store.getRootField("createTag"),
          null
        );
      }
    });
  }, [createTag]);

  return [isTagCreatePending, onCreateTag];
}

export function useUpdateTag(id, name, description, color) {
  const [isTagUpdatePending, updateTag] = useMutation(UpdateTagMutation);

  const onUpdateTag = useCallback(() => {
    updateTag({
      variables: { id, name, description, color }
    });
  }, [name, description, color, id, updateTag]);

  return [isTagUpdatePending, onUpdateTag];
}

export function useDeleteTag(id) {
  const [isTagDeletePending, deleteTag] = useMutation(DeleteTagMutation);

  const onDeleteTag = useCallback(() => {
    deleteTag({
      variables: { id },
      updater: store => {
        const root = store.get(ROOT_ID);
        if (root == null) {
          return;
        }
        const tags = ConnectionHandler.getConnection(root, "Query_tags");
        if (tags == null) {
          return;
        }
        ConnectionHandler.deleteNode(tags, id);
      }
    });
  }, [id, deleteTag]);
  return [isTagDeletePending, onDeleteTag];
}
