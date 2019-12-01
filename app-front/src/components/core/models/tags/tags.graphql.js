import { gql } from "apollo-boost";

export const TAGS_QUERY = gql`
  query Tags($cursor: String) {
    tags(first: 10, after: $cursor) {
      edges {
        id
        name
        description
        color
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTagMutation(
    $name: String!
    $description: String
    $color: HexColorCode!
  ) {
    createTag(name: $name, description: $description, color: $color) {
      id
      name
      description
      color
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTagMutation(
    $id: ID!
    $name: String
    $description: String
    $color: HexColorCode
  ) {
    updateTag(id: $id, name: $name, description: $description, color: $color) {
      id
      name
      description
      color
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTagMutation($id: ID!) {
    deleteTag(id: $id)
  }
`;
