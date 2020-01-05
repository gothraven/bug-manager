import { gql } from "apollo-boost";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      role
      email
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPasswordMutation(
    $oldPassword: String!
    $newPassword: String!
  ) {
    updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($name: String!, $email: EmailAddress!) {
    updateUser(name: $name, email: $email) {
      id
      name
      email
      role
    }
  }
`;

export const USERS_QUERY = gql`
  query Users($cursor: String) {
    users(first: 10, after: $cursor) {
      edges {
        id
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
