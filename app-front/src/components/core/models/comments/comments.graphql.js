import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($issueId: ID!, $content: String!) {
    createComment(content: $content, issueId: $issueId) {
      id
      createdAt
      updatedAt
      content
      creator {
        id
        name
        role
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: ID!) {
    deleteComment(id: $id)
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateCommentMutation($id: ID!, $content: String) {
    updateComment(id: $id, content: $content) {
      id
      createdAt
      updatedAt
      content
      creator {
        id
        name
        role
      }
    }
  }
`;
