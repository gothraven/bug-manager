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

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRoleMutation($id: ID!, $role: Role!) {
    updateUserRole(id: $id, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export const USERS_QUERY = gql`
  query Users($cursor: String, $filters: UserFilter) {
    users(first: 10, after: $cursor, filters: $filters) {
      edges {
        id
        name
        email
        role
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
